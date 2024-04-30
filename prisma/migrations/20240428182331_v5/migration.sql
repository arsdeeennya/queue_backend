/*
  Warnings:

  - You are about to drop the column `name` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `queueingTime` on the `Job` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "name",
DROP COLUMN "queueingTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
