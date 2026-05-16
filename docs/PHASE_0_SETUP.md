# Complete Phase 0 Setup Instructions

**Last Updated**: May 17, 2026
**Phase**: 0 - Infrastructure & Setup
**Duration**: 2 weeks
**Status**: ✅ COMPLETE (Code setup done, manual setup needed)

---

## 📋 What is Phase 0?

Phase 0 is the **infrastructure layer** - everything before writing Phase 1 features.

**Phase 0 includes**:
- ✅ Database setup (Neon PostgreSQL)
- ✅ Project structure (feature-wise)
- ✅ Core utilities (auth, logging, error handling)
- ✅ Development tooling (Jest, ESLint, Prettier)
- ✅ Configuration (environment variables, Prisma)

**Phase 0 does NOT include**:
- ❌ Auth features (Phase 1)
- ❌ Place management (Phase 2)
- ❌ Media uploads (Phase 3)
- ❌ Real API endpoints (Phase 1+)

---

## 🚀 COMPLETE PHASE 0 SETUP (Step-by-Step)

### STEP 1: Update Backend Configuration (.env.local)

**Location**: `c:\Users\ASUS\Downloads\TirthEcho\packages\backend\.env.local`

Open this file and update:

```env
# CRITICAL - Get from Neon Dashboard
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxxx.neon.tech/neondb
DATABASE_POOL_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxxx.neon.tech/neondb?schema=public

# CRITICAL - Generate new one
JWT_SECRET=generate-with-openssl-rand-hex-32

# Optional for Phase 0 (needed Phase 1+)
# MONGODB_URI=mongodb+srv://...
# UPSTASH_REDIS_URL=redis://...

# Server config (leave as is for development)
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:19000
```

**How to get DATABASE_URL from Neon**:
1. Go to https://console.neon.tech/
2. Click your project
3. Click "Connection string" button
4. Copy the postgresql:// string
5. Paste into DATABASE_URL above

**How to generate JWT_SECRET**:
```bash
# On Mac/Linux
openssl rand -hex 16

# On Windows PowerShell
$bytes = [System.Random]::new().GetBytes(16)
$hex = [System.BitConverter]::ToString($bytes).Replace("-","")
$hex.ToLower()
```

---

### STEP 2: Install Dependencies

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Install all npm packages
npm install

# Wait for completion (2-3 minutes)
```

**Expected output**: Completed without errors

**If you get errors**:
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

---

### STEP 3: Initialize Neon Database Schema

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Create initial migration
npx prisma migrate dev --name initial

# This will:
# 1. Connect to Neon
# 2. Create all 13 tables
# 3. Generate Prisma Client
# 4. Create seed data
```

**Expected output**:
```
✅ Prisma schema has been validated against the database and can create the following migration:

  migration_20260517_initial

✅ The following migration(s) have been applied:

  migrations/
    └─ 20260517_initial/
      └─ migration.sql

✅ Generated Prisma Client (5.x.x) to .prisma/client
```

**If DATABASE_URL error**:
- Check DATABASE_URL in `.env.local`
- Verify credentials are correct in Neon
- Try: `psql "your-database-url"` to test connection

---

### STEP 4: Verify Database Tables in Prisma Studio

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Open visual database editor
npm run db:studio

# Browser will open at http://localhost:5555
# You should see all tables:
# - users
# - places
# - reviews
# - media
# - volunteers
# - tasks
# - donations
# - notifications
# - admin_logs
# - verification_queue
# - festivals
# - volunteer_badges
# - reports
# (+ a few more)
```

**Screenshot verification**: You should see table list on left side

---

### STEP 5: Start Backend Development Server

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Start development server with auto-reload
npm run dev

# Expected output:
# ✅ PostgreSQL (Neon) connected successfully
# ✅ Server running on http://localhost:3000
# 📍 Health check: http://localhost:3000/health
# 🚀 Environment: development
```

**Keep this terminal open** - the server stays running

---

### STEP 6: Test Backend Health Endpoint

In a **NEW terminal** (don't close the dev server):

```bash
# Test health check
curl http://localhost:3000/health

# Should output:
# {"status":"ok","timestamp":"2026-05-17T10:30:45.123Z","uptime":XX.XXX,"environment":"development"}
```

**If "Connection refused"**:
- Verify backend is still running in other terminal
- Check PORT=3000 in `.env.local`
- Wait 5 seconds and retry

---

### STEP 7: Frontend Integration Setup (Optional for Phase 0)

```bash
cd c:\Users\ASUS\Downloads\TirthEcho

# Create .env.local for frontend
cd packages/frontend
cat > .env.local << EOF
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_VERSION=v1
EOF

# Install dependencies
npm install
```

---

### STEP 8: Run All Code Quality Checks

In backend terminal:

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Type checking
npm run type-check
# Should show: ✅ No errors

# Linting
npm run lint
# Should show: 0 errors

# Code formatting (fixes automatically)
npm run format

# Unit tests (Phase 1+, might be empty now)
npm test
# Should show: Tests: 0 total
```

---

## ✅ PHASE 0 COMPLETION VERIFICATION

Run this command to verify Phase 0 is complete:

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

echo "=== PHASE 0 VERIFICATION ==="
echo ""
echo "1. Checking TypeScript..."
npm run type-check && echo "✅ TypeScript OK" || echo "❌ TypeScript ERROR"

echo ""
echo "2. Checking Linting..."
npm run lint && echo "✅ Lint OK" || echo "❌ Lint ERROR"

echo ""
echo "3. Checking Database Tables..."
npx prisma db execute --stdin << EOF
SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';
EOF

echo ""
echo "4. Backend running on http://localhost:3000"
echo "   Health check: curl http://localhost:3000/health"

echo ""
echo "=== PHASE 0 ✅ COMPLETE ==="
```

---

## 📁 Phase 0 File Structure

```
packages/backend/
├── src/
│   ├── app.ts                      ← Express app configuration
│   ├── server.ts                   ← Server entry point
│   │
│   ├── features/                   ← Feature-wise organization
│   │   ├── auth/                   ← Auth (Phase 1)
│   │   ├── users/                  ← User mgmt (Phase 1)
│   │   ├── places/                 ← Places (Phase 2)
│   │   ├── media/                  ← Media uploads (Phase 3)
│   │   ├── volunteers/             ← Volunteers (Phase 5)
│   │   ├── donations/              ← Donations (Phase 7)
│   │   ├── community/              ← Community (Phase 6)
│   │   ├── notifications/          ← Notifications (Phase 8)
│   │   ├── admin/                  ← Admin (Phase 9)
│   │   ├── reviews/                ← Reviews (Phase 4)
│   │   └── festivals/              ← Festivals (Phase 1)
│   │
│   └── shared/                     ← Shared utilities
│       ├── auth/
│       │   ├── jwt.ts              ← JWT token generation/verification
│       │   ├── otp.ts              ← OTP generation and hashing
│       │   └── permissions.ts      ← Role-based access control
│       ├── database/
│       │   ├── prisma.ts           ← PostgreSQL client
│       │   ├── mongo.ts            ← MongoDB client
│       │   └── redis.ts            ← Redis client
│       ├── middleware/
│       │   ├── error-handler.ts    ← Error handling
│       │   ├── rate-limit.ts       ← Rate limiting
│       │   └── logger.ts           ← Request logging
│       ├── utils/
│       │   ├── logger.ts           ← Winston logger
│       │   ├── validators.ts       ← Input validation
│       │   └── helpers.ts          ← Helper functions
│       ├── types/
│       │   └── index.ts            ← TypeScript types
│       └── config/
│           └── environment.ts      ← Env var validation
│
├── prisma/
│   ├── schema.prisma               ← Database schema (✅ COMPLETE)
│   └── seed.ts                     ← Seed data
│
├── tests/
│   ├── unit/                       ← Unit tests
│   └── integration/                ← Integration tests
│
├── logs/                           ← Log files (auto-created)
│
├── .env.example                    ← Template (DONE)
├── .env.local                      ← Actual config (YOU CREATE)
├── tsconfig.json                   ← TypeScript config
├── jest.config.js                  ← Jest config
├── .eslintrc.json                  ← ESLint config
├── .prettierrc                     ← Prettier config
└── package.json                    ← Dependencies
```

---

## 🗄️ Database Schema Overview

**13 Core Tables Created**:

| Table | Purpose | Rows |
|-------|---------|------|
| users | User profiles & auth | 0 (seed in Phase 1) |
| places | Temples & locations | 0 (seed in Phase 2) |
| reviews | Place ratings | 0 (Phase 4) |
| media | Photos/videos | 0 (Phase 3) |
| volunteers | Volunteer tracking | 0 (Phase 5) |
| tasks | Volunteer tasks | 0 (Phase 5) |
| donations | Payments | 0 (Phase 7) |
| notifications | Push notifs | 0 (Phase 8) |
| admin_logs | Audit trail | 0 (Phase 9) |
| verification_queue | Content approval | 0 (Phase 3) |
| festivals | Jain festivals | 2 (seeded) |
| volunteer_badges | Gamification | 0 (Phase 5) |
| reports | Moderation | 0 (Phase 11) |

**Relationships**:
- User → Places (one user creates many places)
- User → Reviews (one user writes many reviews)
- User → Donations (one user donates many times)
- Place → Reviews (one place has many reviews)
- Place → Media (one place has many photos/videos)

---

## 🔧 Common Commands

```bash
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Development
npm run dev                    # Start dev server with hot reload
npm run build                  # Build for production
npm start                      # Run production build

# Database
npm run db:push               # Push schema to Neon
npm run db:migrate            # Create migration
npm run db:studio             # Open visual database editor
npm run db:seed               # Seed initial data

# Code quality
npm run lint                  # ESLint check
npm run lint:fix              # Fix linting issues
npm run format                # Format with Prettier
npm run type-check            # TypeScript check
npm test                      # Run Jest tests

# Utilities
npm run build:prod            # Production build
npm run db:reset              # DANGER: Reset database
```

---

## ⚠️ Troubleshooting Phase 0

### Error: "ENOTFOUND host" or "ECONNREFUSED"
**Solution**: Database URL is wrong
```bash
# Check DATABASE_URL
cat packages/backend/.env.local | grep DATABASE_URL

# Get correct URL from Neon console
# https://console.neon.tech → Your Project → Connection String
```

### Error: "no such file .env.local"
**Solution**: Create it
```bash
cd packages/backend
cp .env.example .env.local
# Then edit .env.local with your credentials
```

### Error: "Cannot find module"
**Solution**: Dependencies not installed
```bash
cd packages/backend
rm -rf node_modules package-lock.json
npm install
```

### Error: "port 3000 already in use"
**Solution**: Kill process on port 3000
```bash
# Mac/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "Prisma Client not generated"
**Solution**: Generate it
```bash
cd packages/backend
npx prisma generate
```

---

## 🎯 What Happens After Phase 0

Once Phase 0 is complete:

1. **Backend ready**: `npm run dev` keeps server running
2. **Database ready**: All 13 tables exist in Neon
3. **Tests ready**: Jest configured, waiting for Phase 1
4. **Security ready**: JWT, OTP, rate limiting in place
5. **Documentation ready**: Every utility documented

**Phase 1 starts immediately** with:
- User registration with OTP
- Login with JWT
- User profile management
- First working API endpoints

---

## 📞 Quick Reference

**Start Development**:
```bash
cd packages/backend
npm run dev
# Stays running, auto-reloads on file changes
```

**Test Backend**:
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok",...}
```

**View Database**:
```bash
npm run db:studio
# Opens http://localhost:5555
```

**Check Everything**:
```bash
npm run type-check && npm run lint && npm test
# Shows TypeScript, lint, and test results
```

---

## ✅ Phase 0 SUCCESS INDICATORS

You know Phase 0 is complete when:

1. ✅ `npm run dev` shows: "Server running on http://localhost:3000"
2. ✅ `curl http://localhost:3000/health` returns JSON
3. ✅ `npm run db:studio` opens with all 13 tables visible
4. ✅ `npm run lint` shows 0 errors
5. ✅ `npm run type-check` shows no errors
6. ✅ All feature folders exist in `src/features/`
7. ✅ PostgreSQL (Neon) connected message appears on startup

---

**Phase 0 is now complete! Ready for Phase 1? 🚀**

Next: Start Phase 1 (Authentication) when `npm run dev` is working.
