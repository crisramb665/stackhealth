-- Seed data for development / testing
-- Run after schema.sql

-- Dev user ID matching DEV_USER_ID in packages/lib/src/index.ts
-- TODO: Remove once auth flow is implemented

-- Insert dev user into auth.users
-- TODO: Remove once auth flow is implemented
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, confirmation_token, raw_app_meta_data, raw_user_meta_data, is_super_admin)
values (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'dev@stackhealth.local',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '{"provider":"email","providers":["email"]}',
  '{}',
  false
) on conflict (id) do nothing;

-- Insert dev user profile
insert into public.users (id, email, display_name) values
  ('00000000-0000-0000-0000-000000000000', 'dev@stackhealth.local', 'Dev User')
on conflict (id) do nothing;

-- Example exercises
insert into public.exercises (id, user_id, name, muscle_group) values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'Bench Press', 'chest'),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'Squat', 'legs'),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'Deadlift', 'back'),
  ('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'Overhead Press', 'shoulders'),
  ('a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'Pull-ups', 'back');

-- Example habits
insert into public.habits (id, user_id, name, description, icon, color, frequency) values
  ('b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'Drink Water', '8 glasses a day', '💧', '#3b82f6', 'daily'),
  ('b0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'Take Breaks', 'Stand up and stretch every hour', '🧘', '#10b981', 'daily'),
  ('b0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'Posture Check', 'Check and correct posture', '🪑', '#f59e0b', 'daily');

-- Example reminders
insert into public.reminders (user_id, type, interval_minutes, start_time, end_time) values
  ('00000000-0000-0000-0000-000000000000', 'water', 60, '09:00', '18:00'),
  ('00000000-0000-0000-0000-000000000000', 'break', 45, '09:00', '20:00'),
  ('00000000-0000-0000-0000-000000000000', 'posture', 30, '09:00', '18:00');
