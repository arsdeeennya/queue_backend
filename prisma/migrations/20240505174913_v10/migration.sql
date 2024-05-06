/*
  Warnings:

  - You are about to drop the column `jobId` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "jobId",
DROP COLUMN "read",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nickName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
