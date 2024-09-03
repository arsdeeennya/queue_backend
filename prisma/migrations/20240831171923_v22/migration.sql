/*
  Warnings:

  - You are about to drop the column `status` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `type` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPLICATION', 'APPROVAL', 'REJECT', 'COMPLETED');

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "status",
ADD COLUMN     "type" "NotificationType" NOT NULL;
