-- CAK Group OS schema
create extension if not exists "pgcrypto";

create type public.role_type as enum ('manager', 'account_manager', 'graphic_designer', 'video_editor', 'photographer');
create type public.agency_mode as enum ('full_service', 'paid_ads', 'social_media');
create type public.client_status as enum ('active', 'inactive', 'on_hold');
create type public.campaign_status as enum ('draft', 'planned', 'active', 'paused', 'completed', 'cancelled');
create type public.campaign_type as enum ('full_service', 'paid_ads', 'social_media', 'branding', 'production');
create type public.approval_status as enum ('draft', 'in_review', 'needs_changes', 'approved', 'scheduled', 'published');
create type public.posting_status as enum ('not_ready', 'ready', 'scheduled', 'posted');
create type public.task_priority as enum ('low', 'medium', 'high', 'urgent');
create type public.task_status as enum ('backlog', 'todo', 'in_progress', 'waiting_review', 'approved', 'done', 'blocked');
create type public.crm_stage as enum ('new_lead', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost');

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name public.role_type not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role_id uuid not null references public.roles(id),
  weekly_capacity_hours integer not null default 40,
  agency_mode public.agency_mode not null default 'full_service',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text not null,
  industry text,
  contact_person text,
  email text,
  phone text,
  service_type text,
  monthly_retainer numeric(12,2) default 0,
  start_date date,
  status public.client_status not null default 'active',
  notes text,
  owner_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  service_type text,
  channel text,
  objective text,
  budget numeric(12,2) default 0,
  actual_spend numeric(12,2) default 0,
  start_date date,
  end_date date,
  kpi_target numeric(12,2),
  kpi_actual numeric(12,2),
  owner_id uuid references public.profiles(id),
  status public.campaign_status not null default 'draft',
  campaign_type public.campaign_type not null default 'full_service',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  title text not null,
  platform text not null,
  content_type text not null,
  publish_at timestamptz,
  caption text,
  visual_status text,
  approval_status public.approval_status not null default 'draft',
  posting_status public.posting_status not null default 'not_ready',
  designer_id uuid references public.profiles(id),
  video_editor_id uuid references public.profiles(id),
  photographer_id uuid references public.profiles(id),
  account_manager_id uuid references public.profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  content_item_id uuid references public.content_items(id) on delete set null,
  title text not null,
  description text,
  assigned_user_id uuid references public.profiles(id),
  created_by_id uuid references public.profiles(id),
  priority public.task_priority not null default 'medium',
  due_date date,
  estimated_hours numeric(6,2) default 0,
  actual_hours numeric(6,2) default 0,
  status public.task_status not null default 'todo',
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid references public.profiles(id),
  comment text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  month date not null,
  allocated_budget numeric(12,2) not null default 0,
  actual_spend numeric(12,2) not null default 0,
  internal_production_cost numeric(12,2) not null default 0,
  external_cost numeric(12,2) not null default 0,
  revenue numeric(12,2) not null default 0,
  total_cost numeric(12,2) generated always as (internal_production_cost + external_cost + actual_spend) stored,
  profit numeric(12,2) generated always as (revenue - (internal_production_cost + external_cost + actual_spend)) stored,
  profit_margin numeric(12,4) generated always as (case when revenue = 0 then 0 else (revenue - (internal_production_cost + external_cost + actual_spend)) / revenue end) stored,
  roi numeric(12,4) generated always as (case when (internal_production_cost + external_cost + actual_spend) = 0 then 0 else (revenue - (internal_production_cost + external_cost + actual_spend)) / (internal_production_cost + external_cost + actual_spend) end) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  lead_name text not null,
  company text not null,
  contact_person text,
  source text,
  email text,
  phone text,
  service_interested text,
  estimated_value numeric(12,2) default 0,
  stage public.crm_stage not null default 'new_lead',
  owner_id uuid references public.profiles(id),
  next_follow_up_date date,
  status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.weekly_plans (
  id uuid primary key default gen_random_uuid(),
  week_start date not null,
  week_end date not null,
  team_goals text,
  priorities text,
  key_deliverables text,
  blockers text,
  notes text,
  review_summary text,
  owner_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.weekly_plan_items (
  id uuid primary key default gen_random_uuid(),
  weekly_plan_id uuid not null references public.weekly_plans(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  content_item_id uuid references public.content_items(id) on delete set null,
  owner_id uuid references public.profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.assets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  content_item_id uuid references public.content_items(id) on delete set null,
  uploaded_by uuid references public.profiles(id),
  file_name text not null,
  bucket_path text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_campaigns_client on public.campaigns(client_id);
create index idx_campaigns_owner on public.campaigns(owner_id);
create index idx_content_publish_at on public.content_items(publish_at);
create index idx_tasks_assigned_status on public.tasks(assigned_user_id, status);
create index idx_tasks_due_date on public.tasks(due_date);
create index idx_budgets_client_month on public.budgets(client_id, month);
create index idx_leads_stage on public.crm_leads(stage);
create index idx_weekly_plans_dates on public.weekly_plans(week_start, week_end);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.campaigns enable row level security;
alter table public.tasks enable row level security;
alter table public.budgets enable row level security;
alter table public.crm_leads enable row level security;
alter table public.content_items enable row level security;

create policy "profile_select_own" on public.profiles for select using (auth.uid() = id);
create policy "manager_all_profiles" on public.profiles for all using (
  exists (
    select 1
    from public.profiles p
    join public.roles r on r.id = p.role_id
    where p.id = auth.uid() and r.name = 'manager'
  )
);

create policy "authenticated_read_clients" on public.clients for select to authenticated using (true);
create policy "manager_or_account_write_clients" on public.clients for all to authenticated using (
  exists (
    select 1 from public.profiles p join public.roles r on p.role_id = r.id
    where p.id = auth.uid() and r.name in ('manager', 'account_manager')
  )
);
