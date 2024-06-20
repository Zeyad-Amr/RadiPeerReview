-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('GENERAL', 'UNASSIGNED_REVIEW_REQUEST', 'REQUEST_ASSIGNED', 'REQUEST_REJECTED', 'REQUEST_APPROVED', 'REQUEST_REVIEWED', 'REQUEST_REPORT_RESUBMITTED', 'REQUEST_REREVIEWED', 'REVIEW_FEEDBACK_RECEIVED');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "type" "NotificationType" NOT NULL,
    "receiverId" TEXT NOT NULL,
    "entityId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
