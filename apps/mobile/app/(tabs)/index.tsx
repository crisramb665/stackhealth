import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@stackhealth/ui';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏋️ StackHealth</Text>
      <Text style={styles.subtitle}>Health tracking for developers</Text>

      <Card title="💪 Workouts" subtitle="Log exercises, track sets & reps" />
      <Card title="✅ Habits" subtitle="Build daily streaks" />
      <Card title="⏰ Reminders" subtitle="Water, breaks & posture checks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
});
