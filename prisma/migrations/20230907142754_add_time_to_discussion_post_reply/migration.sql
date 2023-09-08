/*
  Warnings:

  - You are about to drop the column `timePosted` on the `DiscussionThread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiscussionThread" DROP COLUMN "timePosted";
ALTER TABLE "DiscussionThread" ADD COLUMN     "timeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "timePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "timeReplied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
