'use client';

import { useHabits } from '@stackhealth/hooks';

export default function HabitsPage() {
  const { habits, streaks, loading, error, toggleHabitToday } = useHabits();
  console.log({ habits, streaks });

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>✅ Habits</h1>

      {loading && <p>Loading habits...</p>}
      {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

      {!loading && habits.length === 0 && (
        <p style={{ color: '#6b7280', marginTop: 16 }}>No habits yet. Create one to get started!</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {habits.map((habit) => {
          const streak = streaks[habit.id];
          return (
            <li
              key={habit.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>
                  {habit.icon} {habit.name}
                </strong>
                {habit.description && (
                  <p style={{ color: '#6b7280', margin: '4px 0 0' }}>{habit.description}</p>
                )}
                {streak && (
                  <span style={{ color: '#d97706', fontSize: 13 }}>
                    🔥 {streak.current_streak} day streak
                  </span>
                )}
              </div>
              <button
                onClick={() => toggleHabitToday(habit.id)}
                style={{
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                Toggle
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
