import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useWorkoutSessions } from '@stackhealth/hooks';
import { Card } from '@stackhealth/ui';

export default function WorkoutsScreen() {
  const { sessions, loading, error } = useWorkoutSessions();

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
      {sessions.length === 0 ? (
        <Text style={styles.empty}>No workout sessions yet. Start your first one!</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              title={new Date(item.started_at).toLocaleDateString()}
              subtitle={item.notes ?? undefined}
            />
          )}
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
});
