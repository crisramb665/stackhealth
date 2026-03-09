import { View, Text, StyleSheet } from 'react-native';

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⏰ Reminders</Text>
      <Text style={styles.subtitle}>Configure your health reminders</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Water</Text>
        <Text style={styles.cardSubtitle}>Every 60 min • 9:00 – 18:00</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧘 Break</Text>
        <Text style={styles.cardSubtitle}>Every 45 min • 9:00 – 20:00</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🪑 Posture</Text>
        <Text style={styles.cardSubtitle}>Every 30 min • 9:00 – 18:00</Text>
      </View>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
});
