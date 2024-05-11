-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_jobId_fkey";

-- AlterTable
ALTER TABLE "Notice" ALTER COLUMN "jobId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
