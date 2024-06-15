/*
  Warnings:

  - You are about to drop the column `profileImage` on the `teams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teams" DROP COLUMN "profileImage",
ADD COLUMN     "profilePhoto" TEXT;
