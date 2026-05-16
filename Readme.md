

## 📋 Plan Overview

### **13 Development Phases (42 weeks total)**

| Phase | Name | Duration | Key Features |
|-------|------|----------|--------------|
| **0** | Infrastructure Setup | Week 1-2 | Neon DB, Redis, Backblaze, CI/CD |
| **1** | Auth & Users | Week 3-5 | OTP login, profiles, role management |
| **2** | Places (Core Feature) | Week 6-9 | Add/view/search places with PostGIS |
| **3** | Media Uploads | Week 10-12 | Presigned URLs to Backblaze B2 |
| **4** | Reviews & Ratings | Week 13-14 | 1-5 star reviews with helpful votes |
| **5** | Volunteer Program | Week 15-18 | Gamification, tasks, leaderboard |
| **6** | Community & Posts | Week 19-21 | Social feed, comments, discussions |
| **7** | Donations | Week 22-24 | Razorpay integration, 80G receipts |
| **8** | Notifications | Week 25-26 | FCM push + email notifications |
| **9** | Admin Dashboard | Week 27-28 | Analytics, verification queue |
| **10** | Advanced Search + i18n | Week 29-31 | Full-text search, EN/HI multilingual |
| **11** | Security & Compliance | Week 32-33 | Rate limiting, DPDP compliance |
| **12** | Mobile App | Week 34-40 | React Native iOS + Android |
| **13** | Launch Prep | Week 41-42 | Load testing, security audit |

---

## 🏗️ Feature-Wise File Structure (NOT Frontend/Backend Split)

```
e-shraman-jainism/
├── backend/src/features/
│   ├── auth/               ← Everything auth (routes, service, types, tests)
│   ├── places/             ← Everything places (search, geospatial, etc)
│   ├── media/              ← Everything media (uploads, presigned URLs)
│   ├── volunteers/         ← Everything volunteer (tasks, gamification)
│   ├── donations/          ← Everything donations (Razorpay webhook)
│   ├── community/          ← Everything posts/comments
│   ├── notifications/      ← Everything FCM + email
│   ├── admin/              ← Everything admin dashboard
│   └── [8 more features]
│
├── frontend/src/features/
│   ├── auth/               ← LoginPage, RegisterPage, useAuth hook
│   ├── places/             ← PlaceListPage, SearchBar, PlaceMap
│   ├── media/              ← ImageUploader, Gallery components
│   ├── volunteers/         ← VolunteerDashboard, TaskCard
│   ├── donations/          ← DonationForm, ReceiptPage
│   ├── community/          ← PostCard, CommentSection
│   ├── notifications/      ← NotificationBell, List
│   ├── admin/              ← AdminDashboard, VerificationQueue
│   └── [8 more features]
```

**KEY BENEFIT**: Each feature is a complete slice - backend engineer and frontend engineer work on same folder, reducing coordination overhead.

---

## 🗄️ Database Schema

**PostgreSQL (Neon)** - 13 main tables:
- Users (6 role levels: viewer → superadmin)
- Places (with PostGIS for geospatial queries)
- Volunteers (gamification tracking)
- Media (image/video metadata)
- Tasks (volunteer assignments)
- Reviews, Donations, Festivals
- Admin Logs, Reports, Verification Queue
- + History tables for transparency

**MongoDB (Atlas M0)** - 4 collections:
- Posts (community discussions)
- Comments (nested threads)
- Notifications (FCM tokens)
- Activity Log (audit trail)

**Redis (Upstash)** - Caching:
- OTP storage (5 min TTL)
- JWT blacklist on logout
- Rate limiting counters
- Search suggestions cache
- Session management

---

## 🔑 Critical Decisions Made

✅ **Neon DB** (not Docker) - serverless PostgreSQL, no infrastructure management
✅ **Feature-wise structure** - reduces git conflicts, easier onboarding
✅ **Presigned URLs** (not server upload) - saves bandwidth, protects server from large files
✅ **Webhook verification** for Razorpay - prevents payment fraud
✅ **Rate limiting** - prevents abuse on day 1
✅ **DPDP compliance** - required by Indian law
✅ **6-role hierarchy** - granular permission system
✅ **125 features across 19 screens** - complete roadmap

---

## 🚀 What Gets Built Per Phase

**Phase 1 End**: ✅ Users can register & login securely with OTP
**Phase 2 End**: ✅ Browse 50k+ places, search by name/location, map view
**Phase 3 End**: ✅ Upload photos/videos, approved content visible in gallery
**Phase 4 End**: ✅ Leave reviews with ratings (1-5 stars)
**Phase 5 End**: ✅ Volunteers get tasks, earn points, compete on leaderboard
**Phase 6 End**: ✅ Community posts, discussions, comments
**Phase 7 End**: ✅ Donate via Razorpay, get PDF receipt + 80G certificate
**Phase 8 End**: ✅ Push notifications + email digests
**Phase 9 End**: ✅ Admin dashboard with analytics & verification queue
**Phase 10 End**: ✅ Full-text search, multilingual (EN/HI), offline mode
**Phase 11 End**: ✅ Rate limiting, DPDP compliance, security hardened
**Phase 12 End**: ✅ iOS + Android apps on App Store/Play Store
**Phase 13 End**: ✅ **LAUNCH READY** - 99.99% uptime tested, 0 critical bugs

---

## 🛡️ Security Built-In (Not Afterthought)

- OTP hashing (never plain text)
- JWT rotation (15 min access token)
- Token blacklist on logout
- Rate limiting (3 OTP attempts per 10 min)
- Account lockout (after 5 failed logins)
- Razorpay webhook signature verification (no fake payments)
- Presigned URLs (direct to B2, bypassing server)
- CAPTCHA on registration
- Input validation on every endpoint
- SQL injection prevention (Prisma ORM)
- CORS whitelisting
- Helmet.js security headers
- DPDP compliance (delete account, data export)

---

## 📊 Example: How Phase 2 Works

```
WHAT GETS DONE
├── Backend
│   ├── Create Place API (POST /api/v1/places)
│   ├── Get Places List (GET /api/v1/places?page=1)
│   ├── Search with full-text (GET /api/v1/places/search?q=Shikharji)
│   ├── Nearby Places (GET /api/v1/places/nearby?lat=23.1&lng=72.5&radius=10)
│   ├── Place Details (GET /api/v1/places/:id with reviews)
│   ├── PostGIS index for geospatial queries
│   ├── Prisma schema for places table
│   └── Tests (90%+ coverage)
│
├── Frontend
│   ├── PlaceListPage (with pagination)
│   ├── PlaceDetailPage (showing all info)
│   ├── SearchBar (with suggestions)
│   ├── PlaceMap (Google Maps, clusters for 100+ places)
│   ├── FilterPanel (by type, state, city, rating)
│   ├── usePlaces() hook (data fetching)
│   └── Tests (80%+ coverage)
│
└── Verification Checklist
    ├── Can browse all places in list ✅
    ├── Search returns relevant places < 500ms ✅
    ├── Nearby query finds places within 10km ✅
    ├── Place detail loads complete info ✅
    ├── Map shows all 50k places with clustering ✅
    ├── Admin can approve place submissions ✅
    └── No N+1 queries (optimized) ✅
```

---

## 💰 Monthly Cost Breakdown

```
Database: $25-50
  ├── Neon PostgreSQL: $20-50
  ├── MongoDB Atlas: $0 (M0 free)
  └── Redis Upstash: $5-20

Hosting: $27-40
  ├── Railway backend: $7-20
  ├── Vercel frontend: $20
  └── Expo: $0 (free)

Services: $90-100
  ├── Backblaze B2: $6
  ├── Cloudflare: $20
  ├── SendGrid: $20
  ├── Firebase: $0
  ├── Razorpay: 2% + ₹3/txn
  ├── Google Maps: $7
  └── Sentry: $29

TOTAL: ~$150-190/month for full production setup
```

---

## ✅ What's Complete in This Plan

- [x] 13 phases with detailed feature breakdown
- [x] Exact file structure (feature-wise, not frontend/backend)
- [x] Complete database schema (PostgreSQL + MongoDB + Redis)
- [x] API design (REST endpoints, response format)
- [x] Workflow checklist per phase (what works at end)
- [x] Security considerations (14 critical gaps addressed)
- [x] Testing strategy (unit, integration, e2e, load)
- [x] Deployment pipeline (GitHub Actions → Railway/Vercel)
- [x] Team structure (8 people recommended)
- [x] Success metrics per phase
- [x] DPDP/Razorpay/presigned URL best practices
- [x] Monthly cost estimate
- [x] 10-11 month timeline
- [x] All 125 features mapped to phases

---

## 🎯 How to Use This Plan

1. **Share with team** - everyone reads Phase 0 + their assigned phase
2. **Week 1**: Set up infrastructure exactly as Phase 0 specifies
3. **Week 3**: Start Phase 1 (auth) in parallel across backend + frontend
4. **Each Phase**: 
   - Create PR with feature branch
   - Frontend engineer + backend engineer work on same feature folder
   - Tests written as code is written (not after)
   - Demo at end of phase
5. **Dependencies**: Follow the dependency tree - don't start Phase 3 before Phase 2 is done
6. **Success Criteria**: Each phase has specific "Workflow at End" checklist

---

**The plan is saved to `/memories/session/plan.md` and ready for your team to execute.** 

Would you like me to:
1. Create the initial scaffold files for the backend/frontend projects?
2. Create detailed SQL migration scripts for Phase 0?
3. Create the GitHub Actions CI/CD pipeline configuration?
4. Create Postman API collection template?
5. Any specific phase you want more detail on?
