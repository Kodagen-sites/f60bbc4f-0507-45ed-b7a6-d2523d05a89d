import type { Metadata } from "next";
import { loginAction } from "../actions";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const nextPath = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-2xl border border-cream/10 bg-bark/60 p-8 shadow-xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          The Rustic Roast
        </span>
        <h1 className="mt-3 font-display text-3xl text-cream">Admin sign in</h1>
        <p className="mt-2 text-sm text-cream/55">
          Restricted area — staff access only.
        </p>

        {error ? (
          <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            Incorrect email or password.
          </p>
        ) : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={nextPath} />
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-cream/60">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-cream/15 bg-ink/60 px-3 py-2.5 text-cream outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-cream/60">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-cream/15 bg-ink/60 px-3 py-2.5 text-cream outline-none focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-stonegrey"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
