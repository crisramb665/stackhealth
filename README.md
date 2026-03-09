# 🏋️ StackHealth

Health tracking app built for developers. Monorepo powered by **Turborepo + pnpm**.

## Tech Stack

| Layer      | Tech                            |
|------------|-------------------------------------|
| Mobile     | React Native + Expo (expo-router)   |
| Web        | Next.js 14 (App Router)             |
| Backend    | Supabase (Postgres, Auth, Storage)  |
| Language   | TypeScript everywhere               |
| Monorepo   | Turborepo + pnpm workspaces         |

## Project Structure

```
stackhealth/
├── apps/
│   ├── mobile/            # Expo React Native app
│   └── web/               # Next.js web app
├── packages/
│   ├── hooks/             # Shared React hooks (useWorkoutSessions, useHabits…)
│   ├── lib/               # Supabase client, env helpers, utilities
│   ├── types/             # Shared TypeScript types & interfaces
│   └── ui/                # Cross-platform UI components (RN + web via RN-web)
├── tooling/
│   ├── eslint-config/     # Shared ESLint configurations
│   └── typescript-config/ # Shared tsconfig bases
├── supabase/
│   ├── schema.sql         # Full database schema with RLS policies
│   └── seed.sql           # Development seed data
└── turbo.json             # Turborepo pipeline config
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Expo CLI (`npm install -g expo-cli`)
- A Supabase project (free tier works)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Update .env.local with your Supabase project URL and publishable key

# 4. Run the schema in your Supabase SQL Editor
#    → Copy supabase/schema.sql into SQL Editor and run

# 5. Start development
pnpm dev:web      # Next.js on http://localhost:3000
pnpm dev:mobile   # Expo dev server
```

## Features (MVP)

### 💪 Workout Tracking
- Log exercises with muscle group classification
- Track sets, reps, weight (kg), and RPE
- Session-based workout history

### ✅ Habit Tracking
- Create daily/weekly habits
- Streak calculation system
- Toggle completion per day

### ⏰ Developer Health Reminders
- Water intake reminders
- Break reminders (configurable intervals)
- Posture check reminders
- Configurable active hours

## Database

8 tables with Row Level Security (RLS) enabled on all:

- `users` — extends Supabase auth, auto-created on signup
- `exercises` — exercise library per user
- `workout_sessions` — workout session records
- `workouts` — exercises within a session
- `sets` — individual sets (reps, weight, RPE)
- `habits` — habit definitions
- `habit_logs` — daily completion logs
- `reminders` — configurable health reminders

## Shared Packages

| Package              | Purpose                                                |
|----------------------|--------------------------------------------------------|
| `@stackhealth/types` | TypeScript interfaces for all database entities        |
| `@stackhealth/lib`   | Supabase client singleton, env helpers, utility fns    |
| `@stackhealth/hooks` | React hooks consumed by both mobile and web            |
| `@stackhealth/ui`    | React Native components that work on web via RN-web    |

## Scripts

```bash
pnpm dev            # Run all apps in dev mode
pnpm dev:web        # Run only web
pnpm dev:mobile     # Run only mobile
pnpm build          # Build all packages
pnpm lint           # Lint all packages
pnpm format         # Format all files with Prettier
pnpm clean          # Remove all build artifacts and node_modules
```
