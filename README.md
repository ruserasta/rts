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

## Test Users (Auth)
`seed.sql` inserts business/domain data but **does not create Supabase Auth users**.
Create these users from **Supabase Dashboard → Authentication → Users**:

- **Admin / Manager (primary test login):** `manager1@cakgroup.com`
- Recommended test password for all seeded users: `CakGroup!2026`

Suggested users to create:
- manager1@cakgroup.com (manager)
- am1@cakgroup.com (account manager)
- am2@cakgroup.com (account manager)
- designer1@cakgroup.com (graphic designer)
- designer2@cakgroup.com (graphic designer)
- video1@cakgroup.com (video editor)
- photo1@cakgroup.com (photographer)

After creating auth users, insert matching rows in `public.profiles` (id must equal `auth.users.id`) and assign each `role_id` from `public.roles`.

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



## Current Implemented Workflows
- Working login + route protection flow.
- Clients module now supports:
  - server-side loading from Supabase (with mock fallback)
  - add-client server action with permission checks (manager/account manager)
  - filter/search table view with empty state
- Campaigns module now supports:
  - server-side loading from Supabase (with mock fallback)
  - add-campaign server action with permission checks (manager/account manager)
  - status filtering and overspend-aware cards

## Current Readiness
- ✅ Usable internal MVP shell with working Supabase login, protected routes, dashboard metrics, and interactive module views (clients/campaigns/tasks/crm/budgets/capacity/reports).
- 🚧 Still needed for production readiness: persistent CRUD wired to Supabase tables, file uploads, notifications, and automated tests.
