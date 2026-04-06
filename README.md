# CAK Group OS

Internal agency operations platform built with Next.js + Supabase for CAK Group.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS (dark premium CAK theme)
- Supabase Auth + Postgres + Storage
- Recharts for analytics components
- React Hook Form + Zod (planned forms)

## Project Structure
- `app/(auth)` - authentication pages
- `app/(app)` - protected app modules (dashboard, clients, campaigns, etc.)
- `components/layout` - sidebar/topbar/shell
- `components/dashboard` + `components/charts` - dashboard cards/charts
- `lib` - data models, mock seed, RBAC, supabase clients
- `supabase/schema.sql` - complete SQL schema with enums, FK, indexes, RLS
- `supabase/seed.sql` - initial CAK sample records

## Environment Variables
Copy `.env.example` to `.env.local` and set values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Setup
```bash
npm install
npm run dev
```

## Database Setup
1. Create Supabase project.
2. Run `supabase/schema.sql` in SQL editor.
3. Run `supabase/seed.sql` for initial data.

## MVP Coverage
- Auth screen + middleware route protection scaffold
- Role permission map and module navigation
- Premium CAK dark/purple app shell
- Dashboard stats and charts
- Scaffold pages for all required modules
- Agency mode presets in settings

## Next Steps
- Bind auth/session to real Supabase server actions.
- Replace mock data with typed Supabase queries.
- Add forms, table filtering, pagination, and write paths per module.
- Enable drag/drop calendar and kanban workflows.
- Add reports export actions and notifications.
