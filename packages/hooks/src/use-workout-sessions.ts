import { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient, DEV_USER_ID } from '@stackhealth/lib';
import type { WorkoutSession } from '@stackhealth/types';

/**
 * Fetches workout sessions for the current user.
 * Example shared hook consumed by both mobile and web.
 */
export function useWorkoutSessions() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseClient();
      // TODO: Replace DEV_USER_ID with real auth once auth flow is built
      const userId = DEV_USER_ID;

      const { data, error: dbError } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('started_at', { ascending: false });

      if (dbError) throw dbError;
      setSessions(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions };
}
