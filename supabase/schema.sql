-- supabase/schema.sql

-- Habilitar extensões
create extension if not exists "uuid-ossp";

-- Tabela de usuários (complementa auth.users)
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  nome          text,
  cargo         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Contexto da empresa (1 por usuário)
create table public.empresa_context (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  nome              text,
  setor             text,
  mercado           text,
  porte             text,
  receita_faixa     text,
  momento           text,
  cultura_descricao text,
  cultura_desafios  text,
  maturidade_rh     text,
  maturidade_lider  text,
  budget_rh         text,
  desafios_top      text,
  meta_ano          text,
  contexto_extra    text,
  updated_at        timestamptz default now()
);

-- Conversas
create table public.conversations (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  pillar_id     text,
  pillar_name   text,
  agent_id      text,
  titulo        text,
  tipo          text,
  status        text default 'active',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Mensagens
create table public.messages (
  id              uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role            text not null,
  content         text not null,
  metadata        jsonb,
  created_at      timestamptz default now()
);

-- Artefatos
create table public.artifacts (
  id              uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id         uuid references public.profiles(id) on delete cascade not null,
  tipo            text not null,
  titulo          text not null,
  conteudo        text not null,
  pillar_id       text,
  pillar_name     text,
  metadata        jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.empresa_context enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.artifacts enable row level security;

create policy "profiles: own" on public.profiles for all using (auth.uid() = id);
create policy "empresa: own" on public.empresa_context for all using (auth.uid() = user_id);
create policy "conversations: own" on public.conversations for all using (auth.uid() = user_id);
create policy "messages: own" on public.messages for all
  using (conversation_id in (select id from public.conversations where user_id = auth.uid()));
create policy "artifacts: own" on public.artifacts for all using (auth.uid() = user_id);

-- Trigger para criar profile automaticamente
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Índices
create index on public.conversations(user_id, created_at desc);
create index on public.messages(conversation_id, created_at);
create index on public.artifacts(user_id, created_at desc);
create index on public.artifacts(tipo);
