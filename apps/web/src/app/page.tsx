'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>🏋️ StackHealth</h1>
      <p style={{ color: '#6b7280', marginTop: 8 }}>
        Health tracking built for developers. Track workouts, build habits, stay healthy.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
        <Link href="/workouts" style={cardStyle}>
          <h2>💪 Workouts</h2>
          <p>Log exercises, track sets &amp; reps</p>
        </Link>
        <Link href="/habits" style={cardStyle}>
          <h2>✅ Habits</h2>
          <p>Build daily streaks</p>
        </Link>
        <Link href="/reminders" style={cardStyle}>
          <h2>⏰ Reminders</h2>
          <p>Water, breaks &amp; posture</p>
        </Link>
        <Link href="/profile" style={cardStyle}>
          <h2>👤 Profile</h2>
          <p>Settings &amp; account</p>
        </Link>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: 24,
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'box-shadow 0.2s',
};
