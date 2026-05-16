-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('VIEWER', 'CONTRIBUTOR', 'VOLUNTEER', 'MODERATOR', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('TEMPLE', 'TIRTHA', 'MONASTERY', 'AAGAASHGANJ', 'OTHER');

-- CreateEnum
CREATE TYPE "PlaceStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('CREATE', 'UPDATE', 'APPROVE', 'REJECT');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PUBLISHED', 'HIDDEN', 'DELETED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'PDF', 'AUDIO');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VolunteerPosition" AS ENUM ('COORDINATOR', 'GUIDE', 'CURATOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('PLACE_ADDED', 'REVIEW_ADDED', 'MEDIA_UPLOADED', 'TASK_COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'UPI', 'NETBANKING');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ReportTargetType" AS ENUM ('PLACE', 'REVIEW', 'POST', 'MEDIA');

-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('INCORRECT_INFO', 'INAPPROPRIATE_CONTENT', 'DUPLICATE', 'ABUSE');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('REPORTED', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "AdminActionType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'BAN_USER', 'VERIFY_USER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'ALERT', 'SUCCESS', 'ACTION');

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "mobile" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'VIEWER',
    "reputationPoints" INTEGER NOT NULL DEFAULT 0,
    "profileImgUrl" TEXT,
    "district" TEXT,
    "state" TEXT,
    "country" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "otp_attempts" (
    "uuid" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastAttempt" TIMESTAMP(3) NOT NULL,
    "lockedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_attempts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "places" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameEn" TEXT,
    "nameHi" TEXT,
    "placeType" "PlaceType" NOT NULL,
    "description" TEXT,
    "city" TEXT,
    "district" TEXT,
    "state" TEXT,
    "country" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "latitude_geo" DOUBLE PRECISION,
    "longitude_geo" DOUBLE PRECISION,
    "postalCode" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "openingHours" JSONB,
    "bestTimeToVisit" TEXT,
    "nearbyPlaces" TEXT[],
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "water" BOOLEAN NOT NULL DEFAULT false,
    "toilet" BOOLEAN NOT NULL DEFAULT false,
    "disabledAccess" BOOLEAN NOT NULL DEFAULT false,
    "entryFee" TEXT,
    "dressCode" TEXT,
    "photographyAllowed" BOOLEAN NOT NULL DEFAULT true,
    "pujaiming" TEXT,
    "status" "PlaceStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "avgRating" DOUBLE PRECISION,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT NOT NULL,
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "place_history" (
    "uuid" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changeType" "ChangeType" NOT NULL,
    "oldValues" JSONB,
    "newValues" JSONB,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_history_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "reviews" (
    "uuid" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "unhelpfulCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "media" (
    "uuid" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "cloudinaryUrl" TEXT NOT NULL,
    "cloudinaryPublicId" TEXT,
    "b2FileId" TEXT,
    "fileSizeBytes" INTEGER,
    "status" "MediaStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "verification_queue" (
    "uuid" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "verification_queue_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "position" "VolunteerPosition" NOT NULL,
    "numTasksAssigned" INTEGER NOT NULL DEFAULT 0,
    "numTasksDone" INTEGER NOT NULL DEFAULT 0,
    "numApproved" INTEGER NOT NULL DEFAULT 0,
    "numPending" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "district" TEXT,
    "state" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tasks" (
    "uuid" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "deadline" TIMESTAMP(3),
    "surveyData" JSONB,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "volunteer_badges" (
    "uuid" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "badgeName" TEXT NOT NULL,
    "badgeImageUrl" TEXT,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_badges_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "volunteer_scores" (
    "uuid" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "actionType" "ActionType" NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_scores_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "donations" (
    "uuid" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "razorpayPaymentId" TEXT,
    "razorpayOrderId" TEXT,
    "donorName" TEXT,
    "donorEmail" TEXT,
    "receiptNumber" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "upiId" TEXT,
    "status" "DonationStatus" NOT NULL DEFAULT 'PENDING',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "donation_receipts" (
    "uuid" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "receiptPdfUrl" TEXT,
    "receiptNumber" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eightyGEligible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "donation_receipts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "announcements" (
    "uuid" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "audienceRole" "UserRole" NOT NULL,
    "targetState" TEXT,
    "targetDistrict" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "reports" (
    "uuid" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "targetType" "ReportTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "issueType" "IssueType" NOT NULL,
    "description" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'REPORTED',
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "uuid" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "actionType" "AdminActionType" NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT,
    "description" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "festivals" (
    "uuid" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHi" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "dateEn" TEXT,
    "dateHi" TEXT,
    "significance" TEXT,
    "validatedByMonth" BOOLEAN NOT NULL DEFAULT false,
    "lastPublish" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "festivals_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "notifications" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "posts" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "comments" (
    "uuid" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "users"("mobile");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_state_idx" ON "users"("state");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "otp_attempts_mobile_key" ON "otp_attempts"("mobile");

-- CreateIndex
CREATE INDEX "places_state_idx" ON "places"("state");

-- CreateIndex
CREATE INDEX "places_district_idx" ON "places"("district");

-- CreateIndex
CREATE INDEX "places_placeType_idx" ON "places"("placeType");

-- CreateIndex
CREATE INDEX "places_status_idx" ON "places"("status");

-- CreateIndex
CREATE INDEX "places_createdBy_idx" ON "places"("createdBy");

-- CreateIndex
CREATE INDEX "place_history_placeId_idx" ON "place_history"("placeId");

-- CreateIndex
CREATE INDEX "place_history_changedBy_idx" ON "place_history"("changedBy");

-- CreateIndex
CREATE INDEX "reviews_placeId_idx" ON "reviews"("placeId");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "media_placeId_idx" ON "media"("placeId");

-- CreateIndex
CREATE INDEX "media_userId_idx" ON "media"("userId");

-- CreateIndex
CREATE INDEX "media_status_idx" ON "media"("status");

-- CreateIndex
CREATE UNIQUE INDEX "verification_queue_mediaId_key" ON "verification_queue"("mediaId");

-- CreateIndex
CREATE INDEX "verification_queue_status_idx" ON "verification_queue"("status");

-- CreateIndex
CREATE INDEX "verification_queue_priority_idx" ON "verification_queue"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_userId_key" ON "volunteers"("userId");

-- CreateIndex
CREATE INDEX "tasks_volunteerId_idx" ON "tasks"("volunteerId");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE UNIQUE INDEX "donations_razorpayPaymentId_key" ON "donations"("razorpayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "donations_receiptNumber_key" ON "donations"("receiptNumber");

-- CreateIndex
CREATE INDEX "donations_donorId_idx" ON "donations"("donorId");

-- CreateIndex
CREATE INDEX "donations_status_idx" ON "donations"("status");

-- CreateIndex
CREATE INDEX "donations_createdAt_idx" ON "donations"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "donation_receipts_donationId_key" ON "donation_receipts"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "donation_receipts_receiptNumber_key" ON "donation_receipts"("receiptNumber");

-- CreateIndex
CREATE INDEX "admin_logs_adminId_idx" ON "admin_logs"("adminId");

-- CreateIndex
CREATE INDEX "admin_logs_createdAt_idx" ON "admin_logs"("createdAt");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_history" ADD CONSTRAINT "place_history_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_queue" ADD CONSTRAINT "verification_queue_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "volunteers"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_badges" ADD CONSTRAINT "volunteer_badges_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "volunteers"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_scores" ADD CONSTRAINT "volunteer_scores_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "volunteers"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_receipts" ADD CONSTRAINT "donation_receipts_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
