'use client';

import { useWorkoutSessions } from '@stackhealth/hooks';

export default function WorkoutsPage() {
  const { sessions, loading, error } = useWorkoutSessions();

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>💪 Workout Sessions</h1>

      {loading && <p>Loading sessions...</p>}
      {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

      {!loading && sessions.length === 0 && (
        <p style={{ color: '#6b7280', marginTop: 16 }}>
          No workout sessions yet. Start your first one!
        </p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {sessions.map((session) => (
          <li
            key={session.id}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <strong>{new Date(session.started_at).toLocaleDateString()}</strong>
            {session.notes && (
              <p style={{ color: '#6b7280', marginTop: 4 }}>{session.notes}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
