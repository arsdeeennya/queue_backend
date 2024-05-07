/*
  Warnings:

  - You are about to drop the column `accept` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `applicantId` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruiterId` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "acceptedId" INTEGER,
ADD COLUMN     "done" INTEGER[],
ADD COLUMN     "rejectedIds" INTEGER[];

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "accept",
DROP COLUMN "description",
ADD COLUMN     "applicantId" INTEGER NOT NULL,
ADD COLUMN     "jobId" INTEGER NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recruiterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
