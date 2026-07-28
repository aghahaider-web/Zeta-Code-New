-- ZetaCode Supabase Schema — Migration 001
-- Blueprint ref: Section 7.3 (Core Data Model), 7.2 (Roles), 11.3 (Security)

create extension if not exists "uuid-ossp";

-- ==================== ENUMS ====================
create type team_role as enum ('admin', 'operations', 'content_editor');
create type lead_status as enum (
  'new','contacted','qualified','discovery_booked','proposal_in_progress',
  'proposal_sent','won','lost','nurture','archived'
);
create type booking_state as enum ('confirmed','cancelled','completed','no_show');
create type budget_band as enum (
  'under_1500','1500_3000','3000_5000','5000_10000','10000_plus','not_sure'
);

-- ==================== TEAM MEMBERS ====================
create table team_members (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null unique,
  role team_role not null default 'operations',
  active boolean not null default true,
  mfa_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

-- ==================== AVAILABILITY ====================
create table availability_rules (
  id uuid primary key default uuid_generate_v4(),
  day_of_week smallint not null check (day_of_week between 0 and 6),
  timezone text not null default 'UTC',
  start_time time not null,
  end_time time not null,
  slot_duration_minutes int not null default 30,
  buffer_minutes int not null default 0,
  active boolean not null default true,
  created_by uuid references team_members(id),
  created_at timestamptz not null default now()
);

create table availability_exceptions (
  id uuid primary key default uuid_generate_v4(),
  date_start date not null,
  date_end date not null,
  is_available boolean not null default false,
  note text,
  created_by uuid references team_members(id),
  created_at timestamptz not null default now()
);

create table time_slots (
  id uuid primary key default uuid_generate_v4(),
  start_utc timestamptz not null,
  end_utc timestamptz not null,
  capacity int not null default 1,
  status text not null default 'open' check (status in ('open','booked','blocked')),
  created_by uuid references team_members(id),
  created_at timestamptz not null default now(),
  unique (start_utc, end_utc)
);

-- ==================== LEADS ====================
create table leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  business_email text not null,
  company_name text,
  country text,
  website_url text,
  industry text,
  services_interested text[],
  business_challenge text,
  primary_objective text,
  budget_band budget_band,
  desired_timeline text,
  project_details text,
  consent_given boolean not null default false,
  status lead_status not null default 'new',
  owner_id uuid references team_members(id),
  source text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  browser_timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_notes (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade not null,
  author_id uuid references team_members(id),
  note_body text not null,
  created_at timestamptz not null default now()
);

create table lead_activity (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade not null,
  action_type text not null,
  actor text not null,
  created_at timestamptz not null default now()
);

-- ==================== BOOKINGS & PROPOSALS ====================
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) not null,
  slot_id uuid references time_slots(id) not null,
  booking_state booking_state not null default 'confirmed',
  visitor_timezone text,
  confirmation_sent boolean not null default false,
  created_at timestamptz not null default now(),
  unique (slot_id)
);

create table proposal_requests (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) not null,
  requested_services text[],
  budget_band budget_band,
  timeline text,
  brief text,
  created_at timestamptz not null default now()
);

create table consent_records (
  id uuid primary key default uuid_generate_v4(),
  session_ref text not null,
  consent_category text not null,
  policy_version text not null,
  created_at timestamptz not null default now()
);

create table notification_log (
  id uuid primary key default uuid_generate_v4(),
  event text not null,
  recipient text not null,
  delivery_state text not null default 'pending',
  failure_details text,
  created_at timestamptz not null default now()
);

-- ==================== ROW LEVEL SECURITY ====================
alter table team_members enable row level security;
alter table availability_rules enable row level security;
alter table availability_exceptions enable row level security;
alter table time_slots enable row level security;
alter table leads enable row level security;
alter table lead_notes enable row level security;
alter table lead_activity enable row level security;
alter table bookings enable row level security;
alter table proposal_requests enable row level security;
alter table consent_records enable row level security;
alter table notification_log enable row level security;

-- Helper: current user's role, looked up once per query
create or replace function auth_role() returns team_role
language sql security definer stable as $$
  select role from team_members where auth_user_id = auth.uid() and active = true;
$$;

-- Public (anon) can read OPEN time slots only — needed for booking widget
create policy "public_read_open_slots" on time_slots
  for select using (status = 'open');

-- Public (anon) can insert leads/proposals/bookings/consent via server route
-- (server uses service role key, so no anon insert policy needed here —
-- API routes validate server-side per Section 6.5, never client-direct writes)

-- Admin: full access to everything
create policy "admin_full_team_members" on team_members for all
  using (auth_role() = 'admin');
create policy "admin_full_availability_rules" on availability_rules for all
  using (auth_role() = 'admin');
create policy "admin_full_availability_exceptions" on availability_exceptions for all
  using (auth_role() = 'admin');
create policy "admin_full_time_slots" on time_slots for all
  using (auth_role() = 'admin');
create policy "admin_full_leads" on leads for all
  using (auth_role() = 'admin');
create policy "admin_full_lead_notes" on lead_notes for all
  using (auth_role() = 'admin');
create policy "admin_full_lead_activity" on lead_activity for all
  using (auth_role() = 'admin');
create policy "admin_full_bookings" on bookings for all
  using (auth_role() = 'admin');
create policy "admin_full_proposals" on proposal_requests for all
  using (auth_role() = 'admin');

-- Operations: read/write leads+bookings assigned or all (per Section 7.2
-- "as configured" — default here is read/write all, restrict via owner_id
-- filter in app query layer if per-user assignment is enabled later)
create policy "ops_read_write_leads" on leads for select
  using (auth_role() = 'operations');
create policy "ops_update_leads" on leads for update
  using (auth_role() = 'operations');
create policy "ops_read_bookings" on bookings for select
  using (auth_role() in ('operations','admin'));
create policy "ops_manage_availability" on time_slots for all
  using (auth_role() in ('operations','admin'));

-- Content editors: explicitly NO access to lead/booking data
-- (least-privilege per Section 7.2 — CMS access is managed in Sanity,
-- not in Supabase, so no policy grants are added for content_editor here)

-- Audit trail note: privileged writes (status changes, deletions attempts)
-- should be captured into lead_activity by the application layer on every
-- mutation. No lead is hard-deleted (Section 6.4) — only archived via
-- status = 'archived'.

create index idx_leads_status on leads(status);
create index idx_leads_owner on leads(owner_id);
create index idx_bookings_slot on bookings(slot_id);
create index idx_time_slots_status on time_slots(status);
create index idx_lead_activity_lead on lead_activity(lead_id);
