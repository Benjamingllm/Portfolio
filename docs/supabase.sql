-- Remplacer TON-UUID par l'id de ton compte (Authentication > Users), aux 6 endroits.

create table projects (
  id bigint generated always as identity primary key,
  name text not null,
  description text not null default '',
  stack text[] not null default '{}',
  image text,
  link text,
  github text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table settings (
  key text primary key,
  value jsonb not null
);

alter table projects enable row level security;
alter table settings enable row level security;

create policy "lecture publique" on projects for select using (true);
create policy "ecriture admin" on projects for all to authenticated
  using (auth.uid() = 'TON-UUID') with check (auth.uid() = 'TON-UUID');

create policy "lecture publique" on settings for select using (true);
create policy "ecriture admin" on settings for all to authenticated
  using (auth.uid() = 'TON-UUID') with check (auth.uid() = 'TON-UUID');

insert into storage.buckets (id, name, public) values ('medias', 'medias', true);

create policy "ecriture admin" on storage.objects for all to authenticated
  using (bucket_id = 'medias' and auth.uid() = 'TON-UUID')
  with check (bucket_id = 'medias' and auth.uid() = 'TON-UUID');

insert into projects (name, description, stack, image, position)
values ('Tanafit', 'application de suivie de séances de musculations', '{Tailwind,Vue,N8N}', '/img/tanafit.png', 0);
