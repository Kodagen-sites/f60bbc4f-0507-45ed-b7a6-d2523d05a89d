import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        404
      </span>
      <h1 className="mt-4 font-display text-4xl text-stone md:text-5xl">
        This page slipped off the menu.
      </h1>
      <p className="mt-4 max-w-md text-stone/65">
        The page you&apos;re after isn&apos;t here — but the coffee still is.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-stone px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
      >
        Back to home
      </Link>
    </main>
  );
}
