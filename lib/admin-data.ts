/**
 * Server-only read helpers for the admin dashboard. Reads directly from
 * Supabase via the REST API when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are
 * configured; otherwise returns empty arrays so the dashboard renders a clean
 * empty state instead of crashing on a fresh deploy.
 */

export type AdminOrder = {
  id: string;
  status: string;
  currency: string;
  items: Array<{ name: string; quantity: number; price_cents: number }>;
  customer: { full_name?: string; email?: string; phone?: string };
  subtotal_cents: number;
  created_at: string;
};

export type AdminReservation = {
  id: string;
  status: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  full_name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
};

function supa(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function query<T>(path: string): Promise<T[]> {
  const s = supa();
  if (!s) return [];
  try {
    const res = await fetch(`${s.url}/rest/v1/${path}`, {
      headers: { apikey: s.key, Authorization: `Bearer ${s.key}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}

export async function listOrders(): Promise<AdminOrder[]> {
  return query<AdminOrder>(
    "customer_orders?select=*&order=created_at.desc&limit=50",
  );
}

export async function listReservations(): Promise<AdminReservation[]> {
  return query<AdminReservation>(
    "customer_reservations?select=*&order=created_at.desc&limit=50",
  );
}

export function isSupabaseConfigured(): boolean {
  return supa() !== null;
}
