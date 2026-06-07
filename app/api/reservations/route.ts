/**
 * /api/reservations — cafe table reservations (not hotel rooms).
 *
 * POST /api/reservations          create a reservation request
 * GET  /api/reservations?id=...   fetch one (used by the confirmation view)
 *
 * Persistence: Supabase `customer_reservations` when SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY are set, otherwise an in-memory fallback so the
 * flow works end-to-end on a fresh deploy.
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

type ReservationDraft = {
  date: string;
  time: string;
  partySize: number;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
};

type StoredReservation = ReservationDraft & {
  id: string;
  status: "requested" | "confirmed";
  created_at: string;
};

const memoryStore = new Map<string, StoredReservation>();

function getSupabaseAdmin(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function insertReservation(row: StoredReservation): Promise<void> {
  const supa = getSupabaseAdmin();
  if (!supa) {
    memoryStore.set(row.id, row);
    return;
  }
  const res = await fetch(`${supa.url}/rest/v1/customer_reservations`, {
    method: "POST",
    headers: {
      apikey: supa.key,
      Authorization: `Bearer ${supa.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id: row.id,
      status: row.status,
      reservation_date: row.date,
      reservation_time: row.time,
      party_size: row.partySize,
      full_name: row.fullName,
      email: row.email,
      phone: row.phone,
      notes: row.notes ?? "",
      created_at: row.created_at,
    }),
  });
  if (!res.ok) memoryStore.set(row.id, row);
}

async function fetchReservation(id: string): Promise<StoredReservation | null> {
  const supa = getSupabaseAdmin();
  if (!supa) return memoryStore.get(id) ?? null;
  const res = await fetch(
    `${supa.url}/rest/v1/customer_reservations?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: { apikey: supa.key, Authorization: `Bearer ${supa.key}` } },
  );
  if (!res.ok) return memoryStore.get(id) ?? null;
  const rows = (await res.json()) as Array<Record<string, unknown>>;
  if (!rows[0]) return memoryStore.get(id) ?? null;
  const r = rows[0];
  return {
    id: String(r.id),
    status: (r.status as StoredReservation["status"]) ?? "requested",
    date: String(r.reservation_date ?? ""),
    time: String(r.reservation_time ?? ""),
    partySize: Number(r.party_size ?? 2),
    fullName: String(r.full_name ?? ""),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    notes: String(r.notes ?? ""),
    created_at: String(r.created_at ?? new Date().toISOString()),
  };
}

export async function POST(req: Request) {
  let body: ReservationDraft;
  try {
    body = (await req.json()) as ReservationDraft;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.email || !body?.fullName) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required" },
      { status: 400 },
    );
  }
  if (!body?.date || !body?.time) {
    return NextResponse.json(
      { ok: false, error: "Date and time are required" },
      { status: 400 },
    );
  }

  const row: StoredReservation = {
    id: randomUUID(),
    status: "requested",
    created_at: new Date().toISOString(),
    ...body,
  };

  await insertReservation(row);

  return NextResponse.json({ ok: true, reservationId: row.id });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }
  const row = await fetchReservation(id);
  if (!row) {
    return NextResponse.json({ ok: false, error: "Reservation not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, reservation: row });
}
