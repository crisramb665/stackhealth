/**
 * Environment variable helpers.
 *
 * Next.js exposes NEXT_PUBLIC_* vars, Expo exposes EXPO_PUBLIC_* vars.
 * This module normalises access so shared code works in both runtimes.
 */

function getEnv(key: string): string | undefined {
  // Node / Next.js
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
}

export function getSupabaseUrl(): string {
  const url =
    getEnv('NEXT_PUBLIC_SUPABASE_URL') ??
    getEnv('EXPO_PUBLIC_SUPABASE_URL');
  if (!url) throw new Error('Missing SUPABASE_URL env var');
  return url;
}

export function getSupabasePublishableKey(): string {
  const key =
    getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ??
    getEnv('EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  if (!key) throw new Error('Missing SUPABASE_PUBLISHABLE_KEY env var');
  return key;
}
