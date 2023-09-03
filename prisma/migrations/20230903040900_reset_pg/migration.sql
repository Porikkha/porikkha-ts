-- CreateTable
CREATE TABLE "User" (
    "userID" STRING NOT NULL,
    "username" STRING(255) NOT NULL,
    "email" STRING(255) NOT NULL,
    "image" STRING(255),
    "role" STRING NOT NULL DEFAULT 'examiner',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Exam" (
    "examID" STRING NOT NULL,
    "creatorID" STRING NOT NULL,
    "classroomID" INT8,
    "title" STRING NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INT4 NOT NULL,
    "description" STRING,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissions" INT4 NOT NULL DEFAULT 0,
    "totalMarks" INT4 NOT NULL DEFAULT 0,
    "isPublished" BOOL NOT NULL DEFAULT false,
    "canSubmit" BOOL NOT NULL DEFAULT true,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("examID")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionID" INT8 NOT NULL DEFAULT unique_rowid(),
    "examID" STRING NOT NULL,
    "type" STRING NOT NULL,
    "points" INT4 NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("examID","questionID")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "classroomID" INT8 NOT NULL DEFAULT unique_rowid(),
    "creatorID" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("classroomID")
);

-- CreateTable
CREATE TABLE "DiscussionThread" (
    "discussionThreadID" INT8 NOT NULL DEFAULT unique_rowid(),
    "classroomID" INT8 NOT NULL,
    "creatorID" STRING NOT NULL,
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,
    "timePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscussionThread_pkey" PRIMARY KEY ("discussionThreadID")
);

-- CreateTable
CREATE TABLE "Post" (
    "postID" INT8 NOT NULL DEFAULT unique_rowid(),
    "creatorID" STRING NOT NULL,
    "threadID" INT8 NOT NULL,
    "content" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Reply" (
    "replyID" INT8 NOT NULL DEFAULT unique_rowid(),
    "creatorID" STRING NOT NULL,
    "postID" INT8 NOT NULL,
    "content" STRING NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("replyID")
);

-- CreateTable
CREATE TABLE "Submission" (
    "studentID" STRING NOT NULL,
    "examID" STRING NOT NULL,
    "integrityScore" INT4 DEFAULT 100,
    "achievedMarks" INT4 DEFAULT 0,
    "submissionTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("studentID","examID")
);

-- CreateTable
CREATE TABLE "Report" (
    "reportID" INT8 NOT NULL DEFAULT unique_rowid(),
    "type" STRING NOT NULL,
    "description" STRING NOT NULL,
    "examID" STRING NOT NULL,
    "questionID" INT8 NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportID")
);

-- CreateTable
CREATE TABLE "_joinedClassrooms" (
    "A" INT8 NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_joinedClassrooms_AB_unique" ON "_joinedClassrooms"("A", "B");

-- CreateIndex
CREATE INDEX "_joinedClassrooms_B_index" ON "_joinedClassrooms"("B");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_classroomID_fkey" FOREIGN KEY ("classroomID") REFERENCES "Classroom"("classroomID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_classroomID_fkey" FOREIGN KEY ("classroomID") REFERENCES "Classroom"("classroomID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionThread" ADD CONSTRAINT "DiscussionThread_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_threadID_fkey" FOREIGN KEY ("threadID") REFERENCES "DiscussionThread"("discussionThreadID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("postID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_examID_questionID_fkey" FOREIGN KEY ("examID", "questionID") REFERENCES "Question"("examID", "questionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedClassrooms" ADD CONSTRAINT "_joinedClassrooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("classroomID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedClassrooms" ADD CONSTRAINT "_joinedClassrooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
