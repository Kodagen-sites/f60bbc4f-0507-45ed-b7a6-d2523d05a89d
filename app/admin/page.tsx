import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import {
  listOrders,
  listReservations,
  isSupabaseConfigured,
} from "@/lib/admin-data";
import { logoutAction } from "./actions";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

function money(cents: number, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
  }).format((cents || 0) / 100);
}

function when(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-CA");
}

export default async function AdminDashboard() {
  if (!(await isAuthed())) redirect("/admin/login?next=/admin");

  const [orders, reservations] = await Promise.all([
    listOrders(),
    listReservations(),
  ]);
  const configured = isSupabaseConfigured();

  const revenueCents = orders.reduce(
    (sum, o) => sum + (o.subtotal_cents || 0),
    0,
  );

  const stats = [
    { label: "Orders", value: String(orders.length) },
    { label: "Reservations", value: String(reservations.length) },
    { label: "Order revenue", value: money(revenueCents, siteConfig.currency) },
  ];

  return (
    <div className="flex min-h-screen bg-ink text-cream">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-cream/10 bg-bark/50 p-6 md:flex">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          The Rustic Roast
        </span>
        <h2 className="mt-2 font-display text-xl text-cream">Admin</h2>
        <nav className="mt-8 space-y-1 text-sm">
          <a href="#orders" className="block rounded-lg px-3 py-2 text-cream/70 hover:bg-cream/5 hover:text-cream">
            Orders
          </a>
          <a href="#reservations" className="block rounded-lg px-3 py-2 text-cream/70 hover:bg-cream/5 hover:text-cream">
            Reservations
          </a>
        </nav>
        <form action={logoutAction} className="mt-auto pt-8">
          <button
            type="submit"
            className="w-full rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80 transition-colors hover:bg-cream/10"
          >
            Sign out
          </button>
        </form>
      </aside>

      <main className="flex-1 px-6 py-10 md:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-cream">Dashboard</h1>
            <p className="mt-1 text-sm text-cream/55">
              {configured
                ? "Live data from Supabase."
                : "Supabase not configured — showing empty state. Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to enable persistence."}
            </p>
          </div>
          <form action={logoutAction} className="md:hidden">
            <button
              type="submit"
              className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-cream/10 bg-bark/40 p-6"
            >
              <p className="text-xs uppercase tracking-wide text-cream/50">
                {s.label}
              </p>
              <p className="mt-2 font-display text-3xl text-cream">{s.value}</p>
            </div>
          ))}
        </section>

        <section id="orders" className="mt-12">
          <h2 className="font-display text-2xl text-cream">Recent orders</h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-cream/50">No orders yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-cream/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-bark/50 text-cream/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Placed</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Items</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-cream/5">
                      <td className="px-4 py-3 text-cream/70">{when(o.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="text-cream">{o.customer?.full_name || "—"}</div>
                        <div className="text-cream/50">{o.customer?.email}</div>
                      </td>
                      <td className="px-4 py-3 text-cream/70">
                        {(o.items || [])
                          .map((i) => `${i.quantity}× ${i.name}`)
                          .join(", ")}
                      </td>
                      <td className="px-4 py-3 text-cream">
                        {money(o.subtotal_cents, o.currency || siteConfig.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs text-accent">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="reservations" className="mt-12">
          <h2 className="font-display text-2xl text-cream">Reservations</h2>
          {reservations.length === 0 ? (
            <p className="mt-3 text-sm text-cream/50">No reservations yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-cream/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-bark/50 text-cream/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Party</th>
                    <th className="px-4 py-3 font-medium">Guest</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-t border-cream/5">
                      <td className="px-4 py-3 text-cream/70">{r.reservation_date}</td>
                      <td className="px-4 py-3 text-cream/70">{r.reservation_time}</td>
                      <td className="px-4 py-3 text-cream/70">{r.party_size}</td>
                      <td className="px-4 py-3">
                        <div className="text-cream">{r.full_name}</div>
                        <div className="text-cream/50">{r.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs text-accent">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
