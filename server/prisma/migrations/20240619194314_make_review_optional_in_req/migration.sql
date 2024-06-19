-- DropForeignKey
ALTER TABLE "ReviewRequest" DROP CONSTRAINT "ReviewRequest_reviewerId_fkey";

-- AlterTable
ALTER TABLE "ReviewRequest" ALTER COLUMN "status" SET DEFAULT 'Created',
ALTER COLUMN "approved" SET DEFAULT false,
ALTER COLUMN "reviewerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Radiologist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
