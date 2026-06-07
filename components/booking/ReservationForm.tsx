"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

const TIMES = [
  "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm",
  "1:00 pm", "2:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm",
];

export default function ReservationForm() {
  const [form, setForm] = useState({
    date: "",
    time: "6:00 pm",
    partySize: 2,
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Could not request the table");
      setDone(data.reservationId as string);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/10 bg-surface p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <Check className="text-accent" size={26} />
        </div>
        <h3 className="font-display text-2xl text-stone">Table requested</h3>
        <p className="mx-auto mt-3 max-w-sm text-stone/70">
          Thanks, {form.fullName.split(" ")[0] || "friend"} — we&apos;ll confirm your
          table for {form.partySize} on {form.date || "your chosen day"} at {form.time}{" "}
          by email shortly.
        </p>
        <p className="mt-5 text-xs uppercase tracking-widest text-stone/40">
          Ref {done.slice(0, 8).toUpperCase()}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-primary/15 bg-bg px-4 py-3 text-sm text-stone focus:border-accent focus:outline-none transition-colors";
  const labelCls = "mb-1.5 block text-xs uppercase tracking-widest text-stone/55";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <label className="block">
          <span className={labelCls}>Date</span>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className={inputCls}
          >
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select
            value={form.partySize}
            onChange={(e) => setForm({ ...form, partySize: Number(e.target.value) })}
            className={inputCls}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Full name</span>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Email</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
      </label>

      <label className="block">
        <span className={labelCls}>Notes (allergies, occasion, seating…)</span>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={inputCls}
        />
      </label>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-stone px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-bark disabled:opacity-60"
      >
        {submitting ? "Requesting…" : "Request a table"}
      </button>
    </form>
  );
}
