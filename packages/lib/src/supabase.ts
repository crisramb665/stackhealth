import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabasePublishableKey } from './env';

export type { SupabaseClient } from '@supabase/supabase-js';

let client: ReturnType<typeof createClient> | null = null;

/**
 * Returns a singleton Supabase client.
 * Both the web and mobile apps call this; env vars are resolved at runtime.
 */
export function getSupabaseClient() {
  if (!client) {
    client = createClient(getSupabaseUrl(), getSupabasePublishableKey());
  }
  return client;
}
