/*
  Warnings:

  - You are about to drop the column `acceptedId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `applicants` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedIds` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "acceptedId",
DROP COLUMN "applicants",
DROP COLUMN "done",
DROP COLUMN "rejectedIds",
ADD COLUMN     "status" BOOLEAN;

-- DropTable
DROP TABLE "Applicant";

-- DropTable
DROP TABLE "Notice";

-- CreateTable
CREATE TABLE "Applicants" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applicants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Applicants" ADD CONSTRAINT "Applicants_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
