-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  health_score numeric(5,2) default 0,
  budget_velocity numeric(5,2) default 0,
  timeline_confidence numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Health metrics table (time-series data)
create table public.health_metrics (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  health_score numeric(5,2) not null,
  budget_velocity numeric(5,2),
  resource_gaps integer,
  vendor_risks integer,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Risks table
create table public.risks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  probability numeric(5,2),
  impact_score numeric(10,2),
  status text default 'open' check (status in ('open', 'monitoring', 'mitigated', 'closed')),
  detected_at timestamp with time zone default timezone('utc'::text, now()) not null,
  mitigated_at timestamp with time zone
);

-- Decisions table
create table public.decisions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  urgency text check (urgency in ('low', 'medium', 'high')),
  impact_score numeric(10,2),
  options jsonb,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'deferred')),
  decided_by text,
  decided_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stakeholders table
create table public.stakeholders (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  role text not null,
  email text,
  engagement_score numeric(5,2) default 50,
  sentiment text check (sentiment in ('positive', 'neutral', 'negative')),
  last_interaction timestamp with time zone
);

-- Briefings table
create table public.briefings (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  stakeholder_id uuid references public.stakeholders(id) on delete cascade,
  content text not null,
  format text check (format in ('email', 'pdf', 'pptx')),
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  opened_at timestamp with time zone,
  read_duration integer
);

-- Actions table (AI-generated mitigations)
create table public.actions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  risk_id uuid references public.risks(id) on delete set null,
  title text not null,
  description text,
  action_type text check (action_type in ('email', 'calendar', 'slack', 'jira')),
  success_rate numeric(5,2),
  cost numeric(10,2),
  status text default 'suggested' check (status in ('suggested', 'approved', 'executing', 'completed', 'failed')),
  executed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.health_metrics enable row level security;
alter table public.risks enable row level security;
alter table public.decisions enable row level security;
alter table public.stakeholders enable row level security;
alter table public.briefings enable row level security;
alter table public.actions enable row level security;

-- Create policies (for now, allow all - add auth later)
create policy "Allow all operations" on public.projects for all using (true);
create policy "Allow all operations" on public.health_metrics for all using (true);
create policy "Allow all operations" on public.risks for all using (true);
create policy "Allow all operations" on public.decisions for all using (true);
create policy "Allow all operations" on public.stakeholders for all using (true);
create policy "Allow all operations" on public.briefings for all using (true);
create policy "Allow all operations" on public.actions for all using (true);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to projects
create trigger set_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- Create indexes for performance
create index idx_health_metrics_project_id on public.health_metrics(project_id);
create index idx_health_metrics_recorded_at on public.health_metrics(recorded_at desc);
create index idx_risks_project_id on public.risks(project_id);
create index idx_risks_severity on public.risks(severity);
create index idx_decisions_project_id on public.decisions(project_id);
create index idx_decisions_status on public.decisions(status);
create index idx_stakeholders_project_id on public.stakeholders(project_id);
create index idx_briefings_project_id on public.briefings(project_id);
create index idx_actions_project_id on public.actions(project_id);

