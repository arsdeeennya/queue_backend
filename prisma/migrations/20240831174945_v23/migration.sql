/*
  Warnings:

  - You are about to drop the column `roomNum` on the `Chats` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chats" DROP COLUMN "roomNum",
ADD COLUMN     "roomId" TEXT NOT NULL;
