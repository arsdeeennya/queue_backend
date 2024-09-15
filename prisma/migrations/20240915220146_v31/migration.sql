/*
  Warnings:

  - You are about to drop the column `read` on the `Notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "read",
ADD COLUMN     "readAt" TIMESTAMP(3);
