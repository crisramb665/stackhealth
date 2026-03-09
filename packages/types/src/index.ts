// ─── User ───
export interface User {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Workouts ───
export interface Exercise {
  id: string;
  user_id: string;
  name: string;
  muscle_group: MuscleGroup;
  created_at: string;
}

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'core'
  | 'cardio'
  | 'other';

export interface WorkoutSession {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Workout {
  id: string;
  session_id: string;
  exercise_id: string;
  order_index: number;
  created_at: string;
  /** Joined from exercise */
  exercise?: Exercise;
  /** Joined sets */
  sets?: WorkoutSet[];
}

export interface WorkoutSet {
  id: string;
  workout_id: string;
  set_number: number;
  reps: number;
  weight_kg: number;
  rpe: number | null; // rate of perceived exertion 1-10
  completed: boolean;
  created_at: string;
}

// ─── Habits ───
export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  frequency: HabitFrequency;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  notes: string | null;
}

// ─── Reminders ───
export interface Reminder {
  id: string;
  user_id: string;
  type: ReminderType;
  interval_minutes: number;
  is_active: boolean;
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  created_at: string;
  updated_at: string;
}

export type ReminderType = 'water' | 'break' | 'posture' | 'custom';

// ─── API helpers ───
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  page: number;
  pageSize: number;
}

// ─── Streak ───
export interface HabitStreak {
  habit_id: string;
  current_streak: number;
  longest_streak: number;
  last_completed_at: string | null;
}
