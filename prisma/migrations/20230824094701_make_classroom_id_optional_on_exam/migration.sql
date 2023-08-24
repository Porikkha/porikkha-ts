-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_classroomID_fkey";

-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "classroomID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_classroomID_fkey" FOREIGN KEY ("classroomID") REFERENCES "Classroom"("classroomID") ON DELETE SET NULL ON UPDATE CASCADE;
