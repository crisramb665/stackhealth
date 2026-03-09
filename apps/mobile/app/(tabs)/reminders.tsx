import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useHabits } from '@stackhealth/hooks';
import { StreakBadge } from '@stackhealth/ui';

export default function HabitsScreen() {
  const { habits, streaks, loading, error, toggleHabitToday } = useHabits();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {habits.length === 0 ? (
        <Text style={styles.empty}>No habits yet. Create one to get started!</Text>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const streak = streaks[item.id];
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => toggleHabitToday(item.id)}
                activeOpacity={0.7}
              >
                <View>
                  <Text style={styles.habitName}>
                    {item.icon} {item.name}
                  </Text>
                  {item.description && (
                    <Text style={styles.habitDescription}>{item.description}</Text>
                  )}
                </View>
                {streak && <StreakBadge count={streak.current_streak} />}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ef4444',
    fontSize: 16,
  },
  empty: {
    color: '#6b7280',
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  habitName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  habitDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
});
