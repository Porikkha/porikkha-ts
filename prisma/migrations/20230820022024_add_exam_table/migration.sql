-- CreateTable
CREATE TABLE "Exam" (
    "id" STRING NOT NULL,
    "creatorId" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INT4 NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
