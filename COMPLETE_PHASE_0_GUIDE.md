# COMPLETE PHASE 0 MANUAL SETUP GUIDE

**Project**: e-Shraman Jainism Digital Ecosystem
**Phase**: 0 - Infrastructure Setup
**Status**: ✅ CODE COMPLETE - Awaiting Manual Setup
**Date**: May 17, 2026

---

## 📌 WHAT IS PHASE 0?

Phase 0 is the **foundation layer** - everything infrastructure before writing Phase 1 features.

**Included in Phase 0** ✅:
- Backend TypeScript setup
- Neon PostgreSQL database schema
- Authentication utilities (JWT, OTP, permissions)
- Express.js app configuration
- Middleware (error handling, rate limiting, logging)
- Project structure (feature-wise, not frontend/backend split)
- Testing setup (Jest)
- Code quality tools (ESLint, Prettier)
- CI/CD workflows (GitHub Actions)
- Documentation

**NOT included in Phase 0** ❌:
- Actual API endpoints
- User registration
- Place management
- Media uploads
- Volunteer features
- (Everything Phase 1+)

---

## 🚀 MANUAL SETUP STEPS (YOU DO THIS NOW)

### STEP 1: Create .env.local File

**Location**: `c:\Users\ASUS\Downloads\TirthEcho\packages\backend\.env.local`

**Create the file with this content**:

```env
# DATABASE CONNECTIONS (Get from Neon Console)
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-xxxxx.neon.tech/neondb?schema=public
DATABASE_POOL_URL=postgresql://neondb_owner:PASSWORD@ep-xxxxx.neon.tech/neondb?schema=public

# JWT AUTHENTICATION (Generate new one)
JWT_SECRET=0123456789abcdef0123456789abcdef
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# SERVER CONFIG (Leave as-is for development)
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:19000

# LOG LEVEL
LOG_LEVEL=info

# OPTIONAL (Phase 1+)
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tirthecho
# UPSTASH_REDIS_URL=redis://default:pass@host:port
```

**How to get DATABASE_URL from Neon**:
1. Go to https://console.neon.tech/
2. Login to your account
3. Select your project
4. Click "Connection string" or "Connection details"
5. Copy the full postgresql:// string
6. Replace PASSWORD with your actual password
7. Paste into .env.local

**How to generate JWT_SECRET**:

On Windows PowerShell:
```powershell
# Generate 32 character hex string
-join ((0..15 | ForEach-Object { "{0:X}" -f (Get-Random -Maximum 16) }) + (0..15 | ForEach-Object { "{0:X}" -f (Get-Random -Maximum 16) }))

# Or simpler:
[Convert]::ToHex([BitConverter]::GetBytes([Guid]::NewGuid().ToByteArray())) | % { $_.Substring(0,32) }
```

On Mac/Linux:
```bash
openssl rand -hex 16
```

---

### STEP 2: Install Dependencies

Open PowerShell and navigate:

```powershell
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Install all npm packages
npm install

# Wait for completion (should see: added XXX packages)
```

**Expected Output**:
```
added 234 packages
audited 234 packages in 2.34s
```

**If you get errors**:
```powershell
# Clear cache and try again
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

---

### STEP 3: Create Neon Database Schema

Still in `packages\backend`:

```powershell
# Create initial migration and push to Neon
npx prisma migrate dev --name initial

# This will:
# 1. Connect to Neon
# 2. Create migration file
# 3. Create all 13 tables in Neon
# 4. Generate Prisma Client
# 5. Run seed data
```

**Expected Output**:
```
Environment variables loaded from .env.local

Prisma Migrate

✔ Created migrations/20260517000000_initial migration

Your database has been created with seed values.

✔ Generated Prisma Client (5.x.x) in .prisma/client

```

**If "Can't reach database server"**:
- Double-check DATABASE_URL in .env.local
- Verify credentials in Neon console
- Check internet connection to Neon

**If "table already exists"**:
- That's OK! Means schema already migrated
- Continue to STEP 4

---

### STEP 4: Verify Database Tables

```powershell
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Open visual database browser
npm run db:studio

# Browser opens at http://localhost:5555
# Left sidebar should show:
# ✓ users
# ✓ places
# ✓ reviews
# ✓ media
# ✓ volunteers
# ✓ tasks
# ✓ donations
# ✓ notifications
# ✓ admin_logs
# ✓ verification_queue
# ✓ festivals
# ✓ volunteer_badges
# ✓ reports
```

**Take screenshot** to verify all tables exist

---

### STEP 5: Start Backend Development Server

Keep previous terminal with db:studio. Open **NEW terminal**:

```powershell
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Start server with auto-reload
npm run dev

# Expected Output:
# ✅ PostgreSQL (Neon) connected successfully
# ✅ Server running on http://localhost:3000
# 📍 Health check: http://localhost:3000/health
# 📍 API Status: http://localhost:3000/api/v1/status
# 🚀 Environment: development
```

**Keep this terminal open** - server stays running

---

### STEP 6: Test Backend Works

Open **THIRD terminal** (don't close the other two):

```powershell
# Test health endpoint
curl http://localhost:3000/health

# Expected Output:
# {"status":"ok","timestamp":"2026-05-17T10:30:45.123Z","uptime":5.234,"environment":"development"}

# Test API status
curl http://localhost:3000/api/v1/status

# Expected Output:
# {"success":true,"data":{"status":"operational","version":"1.0.0","timestamp":"2026-05-17T10:31:12.456Z"}}
```

**Both curl commands return JSON** = Backend works ✅

---

### STEP 7: Run Code Quality Checks

In the development terminal (where npm run dev is running), press `Ctrl+C` to stop, then:

```powershell
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend

# Type checking
npm run type-check
# Should show: ✅ No TypeScript errors

# Linting  
npm run lint
# Should show: ✅ 0 errors

# Code formatting (fixes issues)
npm run format
# Should show: ✅ Files formatted

# Tests (Phase 0 may have none yet)
npm test
# Should show: Tests: 0 total
```

---

## ✅ PHASE 0 VERIFICATION CHECKLIST

```powershell
# Check all Phase 0 requirements

echo "=== PHASE 0 VERIFICATION ==="
echo ""
echo "✓ Step 1: .env.local exists?"
Test-Path "c:\Users\ASUS\Downloads\TirthEcho\packages\backend\.env.local"

echo ""
echo "✓ Step 2: node_modules exists?"
Test-Path "c:\Users\ASUS\Downloads\TirthEcho\packages\backend\node_modules"

echo ""
echo "✓ Step 3: Start server and test endpoint"
echo "   (In separate terminal: npm run dev)"
echo "   (Then: curl http://localhost:3000/health)"

echo ""
echo "✓ Step 4: View database"
echo "   (Run: npm run db:studio)"
echo "   (Should see 13 tables)"

echo ""
echo "✓ Step 5: Code quality"
cd "c:\Users\ASUS\Downloads\TirthEcho\packages\backend"
npm run type-check
npm run lint

echo ""
echo "=== PHASE 0 COMPLETE ==="
```

---

## 📁 What Was Created

### Backend Source Code (src/)
```
src/
├── app.ts                          Express app (middleware, error handling)
├── server.ts                       Server entry point
├── features/                       Feature folders (11 total)
│   ├── auth/                       Authentication (Phase 1)
│   ├── places/                     Places/temples (Phase 2)
│   ├── media/                      Media uploads (Phase 3)
│   ├── reviews/                    Reviews (Phase 4)
│   ├── volunteers/                 Volunteers (Phase 5)
│   ├── community/                  Community (Phase 6)
│   ├── donations/                  Donations (Phase 7)
│   ├── notifications/              Notifications (Phase 8)
│   ├── admin/                      Admin features (Phase 9)
│   ├── festivals/                  Festivals
│   └── (others for Phase 10+)
│
└── shared/                         Shared utilities
    ├── auth/
    │   ├── jwt.ts                  JWT tokens
    │   ├── otp.ts                  OTP generation
    │   └── permissions.ts          Role checks
    ├── database/
    │   ├── prisma.ts               PostgreSQL client
    │   ├── mongo.ts                MongoDB client
    │   └── redis.ts                Redis client
    ├── middleware/
    │   ├── error-handler.ts        Error handling
    │   ├── rate-limit.ts           Rate limiting
    │   └── logger.ts               Request logging
    ├── utils/
    │   ├── logger.ts               Winston logger
    │   ├── validators.ts           Input validation
    │   └── helpers.ts              Helper functions
    ├── types/
    │   └── index.ts                TypeScript types
    └── config/
        └── environment.ts          Config validation
```

### Configuration Files
```
✓ package.json              All dependencies
✓ tsconfig.json             TypeScript config (strict mode)
✓ jest.config.js            Jest testing config
✓ .eslintrc.json            ESLint rules
✓ .prettierrc                Prettier formatting
✓ prisma/schema.prisma      13 database tables
✓ .env.example              Template (you created .env.local from this)
```

### Database (Neon PostgreSQL)
```
13 Tables Created:
✓ users              (user profiles & roles)
✓ places             (temples, tirthas, monasteries)
✓ reviews            (1-5 star ratings)
✓ media              (photos, videos)
✓ volunteers         (volunteer tracking)
✓ tasks              (volunteer assignments)
✓ donations          (payment records)
✓ notifications      (push notification records)
✓ admin_logs         (audit trail)
✓ verification_queue (content approval queue)
✓ festivals          (Jain festival calendar)
✓ volunteer_badges   (gamification badges)
✓ reports            (moderation reports)
```

### GitHub Actions Workflows
```
✓ .github/workflows/lint.yml       Runs ESLint on PRs
✓ .github/workflows/test.yml       Runs Jest on PRs
```

---

## 🔐 Security Features Built In

✅ **JWT Tokens**
- 15-minute expiry
- Refresh token support
- Token validation middleware

✅ **OTP System**
- SHA256 hashing
- Redis rate limiting
- Max 3 attempts per 10 minutes

✅ **Rate Limiting**
- Per-endpoint configuration
- IP-based tracking
- Different limits for auth vs public endpoints

✅ **Access Control**
- 6 role levels (VIEWER → SUPERADMIN)
- Role-based middleware
- Permission checks

✅ **Error Handling**
- Global error middleware
- Structured error responses
- Stack traces in development only

---

## 🧪 Verification Commands

Copy and run to verify Phase 0 complete:

```powershell
# Open 3 terminals

# TERMINAL 1: Server
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend
npm run dev

# TERMINAL 2: Health check (after server starts)
curl http://localhost:3000/health
# Should return: {"status":"ok",...}

# TERMINAL 3: Database browser
cd c:\Users\ASUS\Downloads\TirthEcho\packages\backend
npm run db:studio
# Should open http://localhost:5555 with 13 tables visible

# TERMINAL 1 (stop server): Code quality
Ctrl+C
npm run lint
npm run type-check
# Both should show 0 errors

# All pass = Phase 0 ✅ COMPLETE
```

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### ❌ Error: "PostgreSQL connection failed"
**Cause**: Wrong DATABASE_URL or credentials
```powershell
# Verify DATABASE_URL
cat .env.local | findstr DATABASE_URL

# Get correct URL from Neon:
# 1. https://console.neon.tech
# 2. Your Project → Connection String
# 3. Copy entire string
# 4. Update .env.local
```

### ❌ Error: "Port 3000 already in use"
**Cause**: Another process on port 3000
```powershell
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
# Edit .env.local: PORT=3001
```

### ❌ Error: "Cannot find module 'express'"
**Cause**: Dependencies not installed
```powershell
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### ❌ Error: "no such file .env.local"
**Cause**: File doesn't exist
```powershell
cp .env.example .env.local
# Then edit .env.local with DATABASE_URL
```

### ❌ Error: "Prisma Client not generated"
**Cause**: Client generation missing
```powershell
npx prisma generate
```

### ❌ Error: "migration.lock exists"
**Cause**: Previous migration failed
```powershell
# Check status
npx prisma migrate status

# Reset if needed (DANGER: deletes all data)
npx prisma migrate reset

# Then re-run migration
npx prisma migrate dev --name initial
```

---

## 📊 What You'll See When Everything Works

### Terminal 1 (npm run dev):
```
✅ PostgreSQL (Neon) connected successfully
✅ Server running on http://localhost:3000
📍 Health check: http://localhost:3000/health
📍 API Status: http://localhost:3000/api/v1/status
🚀 Environment: development
```

### Terminal 2 (curl localhost:3000/health):
```json
{
  "status": "ok",
  "timestamp": "2026-05-17T10:30:45.123Z",
  "uptime": 5.234,
  "environment": "development"
}
```

### Browser (npm run db:studio):
Shows 13 tables in left sidebar:
- users
- places
- reviews
- media
- volunteers
- tasks
- donations
- (... 6 more)

---

## 📅 Timeline After Phase 0

```
Phase 0: Complete ✅
         ↓
Phase 1: Authentication (Week 3-5)
         - User registration with OTP
         - Login with JWT
         - Profile management
         - First real API
         ↓
Phase 2: Places (Week 6-9)
         ↓
Phase 3: Media Uploads (Week 10-12)
         ↓
... 9 more phases (weeks 13-42)
         ↓
Phase 13: Super Admin Dashboard
```

---

## 🎯 Next Actions After Phase 0 Complete

1. **Keep `npm run dev` running** - it stays on during all development
2. **Start Phase 1** - Next phase is Authentication
3. **Each team member picks a feature** - Start Phase 1 work
4. **Daily dev cycle**: 
   - npm run dev (keep running)
   - Make code changes (auto-reload)
   - Test in browser/curl
   - Push to GitHub

---

## ✅ PHASE 0 CHECKLIST - MARK WHEN DONE

- [ ] Created `.env.local` with DATABASE_URL
- [ ] Ran `npm install` successfully
- [ ] Ran `npx prisma migrate dev --name initial` successfully
- [ ] Started `npm run dev` - server is running
- [ ] Tested `curl http://localhost:3000/health` - returns JSON
- [ ] Opened `npm run db:studio` - see 13 tables
- [ ] Ran `npm run lint` - 0 errors
- [ ] Ran `npm run type-check` - no errors
- [ ] All feature folders exist in `src/features/`
- [ ] Read this entire guide

**ALL CHECKED** = Phase 0 ✅ COMPLETE!

---

## 📞 SUPPORT

**Stuck?** Check:
1. Error message - usually says exactly what's wrong
2. This guide - common issues section
3. .env.local - verify DATABASE_URL is correct
4. Neon console - verify database exists
5. Terminal - watch for error messages

---

**Congratulations! Phase 0 Infrastructure is now ready! 🚀**

**Next: Phase 1 Authentication development begins when `npm run dev` is running.**
