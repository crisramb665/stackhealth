import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';

interface StreakBadgeProps {
  count: number;
  label?: string;
  style?: ViewStyle;
}

/**
 * Displays a streak count with a flame icon (emoji for now).
 */
export function StreakBadge({ count, label = 'day streak', style }: StreakBadgeProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.flame}>🔥</Text>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flame: {
    fontSize: 18,
    marginRight: 4,
  },
  count: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d97706',
    marginRight: 4,
  },
  label: {
    fontSize: 13,
    color: '#92400e',
  },
});
