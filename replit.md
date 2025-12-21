# Lab.dev - Profile Link Platform

## Overview

Lab.dev is a customizable profile link platform (similar to Linktree/guns.lol) that allows users to create personalized landing pages with their social links, custom themes, and interactive effects. The platform features a gamification system with XP/levels, extensive visual customization options, and real-time profile previews.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: GSAP and Framer Motion for advanced motion design
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Authentication**: Passport.js with local strategy, session-based auth using express-session with PostgreSQL session store (connect-pg-simple)
- **Password Security**: scrypt-based password hashing with timing-safe comparison

### Data Storage
- **Database**: PostgreSQL accessed via Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Migrations**: Drizzle Kit with migrations output to `./migrations`
- **Key Tables**:
  - `users`: Profile data, customization settings, gamification stats (level, XP, views)
  - `links`: User's social/external links with ordering

### Build System
- **Development**: tsx for TypeScript execution, Vite dev server with HMR
- **Production**: Custom build script using esbuild for server bundling, Vite for client build
- **Output**: Server bundles to `dist/index.cjs`, client builds to `dist/public`

### Path Aliases
- `@/*` → `./client/src/*` (frontend code)
- `@shared/*` → `./shared/*` (shared types/routes/schema)
- `@assets` → `./attached_assets` (static assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled components built on Radix, configured in `components.json`
- **Recharts**: Data visualization for analytics dashboard

### Animation Libraries
- **GSAP**: Timeline-based animations and scroll effects
- **Framer Motion**: React-optimized declarative animations
- **Embla Carousel**: Touch-enabled carousel component

### Development Tools
- **Replit Plugins**: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner for enhanced Replit development experience

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption (defaults to fallback in development)