-- StackHealth Database Schema
-- Run this in the Supabase SQL Editor or as a migration.

-- ─────────────────────────────────────────────
-- 1. USERS (extends Supabase auth.users)
-- ─────────────────────────────────────────────
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  display_name text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────
-- 2. EXERCISES (exercise library)
-- ─────────────────────────────────────────────
create table if not exists public.exercises (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users(id) on delete cascade,
  name         text not null,
  muscle_group text not null check (muscle_group in (
    'chest','back','shoulders','biceps','triceps','legs','core','cardio','other'
  )),
  created_at   timestamptz not null default now()
);

alter table public.exercises enable row level security;

create policy "Users manage own exercises"
  on public.exercises for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 3. WORKOUT SESSIONS
-- ─────────────────────────────────────────────
create table if not exists public.workout_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  notes       text,
  created_at  timestamptz not null default now()
);

alter table public.workout_sessions enable row level security;

create policy "Users manage own workout sessions"
  on public.workout_sessions for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 4. WORKOUTS (exercises within a session)
-- ─────────────────────────────────────────────
create table if not exists public.workouts (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id  uuid not null references public.exercises(id) on delete cascade,
  order_index  int not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.workouts enable row level security;

create policy "Users manage own workouts"
  on public.workouts for all
  using (
    exists (
      select 1 from public.workout_sessions ws
      where ws.id = workouts.session_id
        and ws.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────
-- 5. SETS
-- ─────────────────────────────────────────────
create table if not exists public.sets (
  id          uuid primary key default gen_random_uuid(),
  workout_id  uuid not null references public.workouts(id) on delete cascade,
  set_number  int not null,
  reps        int not null,
  weight_kg   numeric(6,2) not null default 0,
  rpe         int check (rpe between 1 and 10),
  completed   boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.sets enable row level security;

create policy "Users manage own sets"
  on public.sets for all
  using (
    exists (
      select 1 from public.workouts w
      join public.workout_sessions ws on ws.id = w.session_id
      where w.id = sets.workout_id
        and ws.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────
-- 6. HABITS
-- ─────────────────────────────────────────────
create table if not exists public.habits (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  name        text not null,
  description text,
  icon        text,
  color       text,
  frequency   text not null default 'daily' check (frequency in ('daily','weekly','custom')),
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.habits enable row level security;

create policy "Users manage own habits"
  on public.habits for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 7. HABIT LOGS
-- ─────────────────────────────────────────────
create table if not exists public.habit_logs (
  id            uuid primary key default gen_random_uuid(),
  habit_id      uuid not null references public.habits(id) on delete cascade,
  user_id       uuid not null references public.users(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  notes         text
);

alter table public.habit_logs enable row level security;

create policy "Users manage own habit logs"
  on public.habit_logs for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- 8. REMINDERS
-- ─────────────────────────────────────────────
create table if not exists public.reminders (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references public.users(id) on delete cascade,
  type              text not null check (type in ('water','break','posture','custom')),
  interval_minutes  int not null default 30,
  is_active         boolean not null default true,
  start_time        time not null default '09:00',
  end_time          time not null default '18:00',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.reminders enable row level security;

create policy "Users manage own reminders"
  on public.reminders for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────
create index if not exists idx_exercises_user on public.exercises(user_id);
create index if not exists idx_workout_sessions_user on public.workout_sessions(user_id);
create index if not exists idx_workouts_session on public.workouts(session_id);
create index if not exists idx_sets_workout on public.sets(workout_id);
create index if not exists idx_habits_user on public.habits(user_id);
create index if not exists idx_habit_logs_habit on public.habit_logs(habit_id);
create index if not exists idx_habit_logs_user_date on public.habit_logs(user_id, completed_at);
create index if not exists idx_reminders_user on public.reminders(user_id);
