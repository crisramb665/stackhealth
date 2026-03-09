export { getSupabaseClient } from './supabase';
export type { SupabaseClient } from './supabase';
export { getSupabaseUrl, getSupabasePublishableKey } from './env';
export { toDateString, calculateStreak } from './utils';

// TODO: Remove once auth flow is implemented
export const DEV_USER_ID = '00000000-0000-0000-0000-000000000000';
