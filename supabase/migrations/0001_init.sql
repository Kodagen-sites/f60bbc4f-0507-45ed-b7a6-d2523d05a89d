-- The Rustic Roast — initial schema
-- Tables backing the storefront cart, table reservations, and contact inquiries.
-- Written by the API route handlers via the Supabase service-role key, read by
-- the admin dashboard. RLS is enabled with no public policies, so only the
-- service role (server-side) can touch these rows.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Orders (cart checkout → /api/orders)
-- ---------------------------------------------------------------------------
create table if not exists public.customer_orders (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null,
  status          text not null default 'placed',
  currency        text not null default 'CAD',
  items           jsonb not null default '[]'::jsonb,
  customer        jsonb not null default '{}'::jsonb,
  subtotal_cents  integer not null default 0,
  created_at      timestamptz not null default now()
);

create index if not exists customer_orders_created_at_idx
  on public.customer_orders (created_at desc);

-- ---------------------------------------------------------------------------
-- Table reservations (/api/reservations)
-- ---------------------------------------------------------------------------
create table if not exists public.customer_reservations (
  id                uuid primary key default gen_random_uuid(),
  status            text not null default 'requested',
  reservation_date  date not null,
  reservation_time  text not null,
  party_size        integer not null default 2,
  full_name         text not null,
  email             text not null,
  phone             text,
  notes             text,
  created_at        timestamptz not null default now()
);

create index if not exists customer_reservations_created_at_idx
  on public.customer_reservations (created_at desc);

-- ---------------------------------------------------------------------------
-- Contact inquiries (general messages)
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  status      text not null default 'new',
  full_name   text not null,
  email       text not null,
  phone       text,
  message     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security — lock down to service role only.
-- ---------------------------------------------------------------------------
alter table public.customer_orders        enable row level security;
alter table public.customer_reservations  enable row level security;
alter table public.inquiries              enable row level security;
