-- CreateTable
CREATE TABLE "Notification" (
    "notificationID" STRING NOT NULL,
    "fromUserID" STRING NOT NULL,
    "toUserID" STRING NOT NULL,
    "content" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationID")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fromUserID_fkey" FOREIGN KEY ("fromUserID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toUserID_fkey" FOREIGN KEY ("toUserID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
