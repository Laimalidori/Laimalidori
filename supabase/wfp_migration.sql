-- ─────────────────────────────────────────────────────────
-- Módulo 01 — Workforce Planning
-- Migration SQL para Supabase
-- ─────────────────────────────────────────────────────────

-- Projetos WFP
create table if not exists public.wfp_projects (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  nome              text not null,
  status            text not null default 'parametrizando',
  parametrizacao    jsonb not null default '{}',
  etapas_status     jsonb not null default '[]',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- Outputs por etapa
create table if not exists public.wfp_stage_outputs (
  id                uuid default uuid_generate_v4() primary key,
  projeto_id        uuid references public.wfp_projects(id) on delete cascade not null,
  etapa_id          integer not null check (etapa_id between 1 and 6),
  conteudo          jsonb not null default '{}',
  mensagens         jsonb not null default '[]',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  unique (projeto_id, etapa_id)
);

-- RLS
alter table public.wfp_projects enable row level security;
alter table public.wfp_stage_outputs enable row level security;

create policy "wfp_projects: own"
  on public.wfp_projects for all
  using (auth.uid() = user_id);

create policy "wfp_stage_outputs: own"
  on public.wfp_stage_outputs for all
  using (projeto_id in (
    select id from public.wfp_projects where user_id = auth.uid()
  ));

-- Índices
create index if not exists wfp_projects_user_id on public.wfp_projects(user_id, created_at desc);
create index if not exists wfp_stage_outputs_projeto on public.wfp_stage_outputs(projeto_id);

-- Trigger updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger wfp_projects_updated_at
  before update on public.wfp_projects
  for each row execute function update_updated_at();

create trigger wfp_stage_outputs_updated_at
  before update on public.wfp_stage_outputs
  for each row execute function update_updated_at();
