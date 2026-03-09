import { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient } from '@stackhealth/lib';
import { calculateStreak, toDateString } from '@stackhealth/lib';
import type { Habit, HabitLog, HabitStreak } from '@stackhealth/types';

/**
 * Manages habits and their streaks for the current user.
 */
export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [streaks, setStreaks] = useState<Record<string, HabitStreak>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = getSupabaseClient();

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Not authenticated');
        return;
      }

      const { data, error: dbError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      setHabits(data ?? []);

      // Calculate streaks per habit
      const streakMap: Record<string, HabitStreak> = {};
      for (const habit of data ?? []) {
        const { data: logs } = await supabase
          .from('habit_logs')
          .select('completed_at')
          .eq('habit_id', habit.id)
          .order('completed_at', { ascending: false })
          .limit(90);

        const dates = (logs ?? []).map((l: Pick<HabitLog, 'completed_at'>) =>
          toDateString(new Date(l.completed_at)),
        );
        const uniqueDates = [...new Set(dates)];
        streakMap[habit.id] = {
          habit_id: habit.id,
          current_streak: calculateStreak(uniqueDates),
          longest_streak: calculateStreak(uniqueDates), // simplified for MVP
          last_completed_at: uniqueDates[0] ?? null,
        };
      }
      setStreaks(streakMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const toggleHabitToday = useCallback(
    async (habitId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = toDateString(new Date());
      const { data: existing } = await supabase
        .from('habit_logs')
        .select('id')
        .eq('habit_id', habitId)
        .eq('user_id', user.id)
        .gte('completed_at', `${today}T00:00:00`)
        .lte('completed_at', `${today}T23:59:59`)
        .limit(1);

      if (existing && existing.length > 0) {
        await supabase.from('habit_logs').delete().eq('id', existing[0].id);
      } else {
        await supabase.from('habit_logs').insert({
          habit_id: habitId,
          user_id: user.id,
          completed_at: new Date().toISOString(),
        });
      }
      await fetchHabits();
    },
    [supabase, fetchHabits],
  );

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return { habits, streaks, loading, error, refetch: fetchHabits, toggleHabitToday };
}
