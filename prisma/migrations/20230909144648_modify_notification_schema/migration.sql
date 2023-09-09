/*
  Warnings:

  - You are about to drop the column `fromUserID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `toUserID` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `fromUserEmail` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserEmail` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_fromUserID_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_toUserID_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "fromUserID";
ALTER TABLE "Notification" DROP COLUMN "toUserID";
ALTER TABLE "Notification" ADD COLUMN     "fromUserEmail" STRING NOT NULL;
ALTER TABLE "Notification" ADD COLUMN     "toUserEmail" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fromUserEmail_fkey" FOREIGN KEY ("fromUserEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toUserEmail_fkey" FOREIGN KEY ("toUserEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
