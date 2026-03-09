-- Seed data for development / testing
-- Run after schema.sql

-- NOTE: Replace 'YOUR_USER_UUID' with an actual auth.users id after sign-up.
-- These are examples to illustrate the data model.

-- Example exercises
insert into public.exercises (id, user_id, name, muscle_group) values
  ('a0000000-0000-0000-0000-000000000001', 'YOUR_USER_UUID', 'Bench Press', 'chest'),
  ('a0000000-0000-0000-0000-000000000002', 'YOUR_USER_UUID', 'Squat', 'legs'),
  ('a0000000-0000-0000-0000-000000000003', 'YOUR_USER_UUID', 'Deadlift', 'back'),
  ('a0000000-0000-0000-0000-000000000004', 'YOUR_USER_UUID', 'Overhead Press', 'shoulders'),
  ('a0000000-0000-0000-0000-000000000005', 'YOUR_USER_UUID', 'Pull-ups', 'back');

-- Example habits
insert into public.habits (id, user_id, name, description, icon, color, frequency) values
  ('b0000000-0000-0000-0000-000000000001', 'YOUR_USER_UUID', 'Drink Water', '8 glasses a day', '💧', '#3b82f6', 'daily'),
  ('b0000000-0000-0000-0000-000000000002', 'YOUR_USER_UUID', 'Take Breaks', 'Stand up and stretch every hour', '🧘', '#10b981', 'daily'),
  ('b0000000-0000-0000-0000-000000000003', 'YOUR_USER_UUID', 'Posture Check', 'Check and correct posture', '🪑', '#f59e0b', 'daily');

-- Example reminders
insert into public.reminders (user_id, type, interval_minutes, start_time, end_time) values
  ('YOUR_USER_UUID', 'water', 60, '09:00', '18:00'),
  ('YOUR_USER_UUID', 'break', 45, '09:00', '20:00'),
  ('YOUR_USER_UUID', 'posture', 30, '09:00', '18:00');
