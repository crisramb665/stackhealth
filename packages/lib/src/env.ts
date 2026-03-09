/**
 * Environment variable helpers.
 *
 * Next.js and Expo inline NEXT_PUBLIC_* / EXPO_PUBLIC_* env vars at build time,
 * but only when accessed as literal property names (e.g. process.env.NEXT_PUBLIC_X).
 * Dynamic access like process.env[key] is NOT replaced and will be undefined.
 * Therefore we must reference each variable with its full literal name.
 */

export function getSupabaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('Missing SUPABASE_URL env var');
  return url;
}

export function getSupabasePublishableKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) throw new Error('Missing SUPABASE_PUBLISHABLE_KEY env var');
  return key;
}
