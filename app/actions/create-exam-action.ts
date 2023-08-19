"use server";

import { connectMongoDB } from "@/utils/database";
import Exam from "@/models/exams";
import ExamInterface from "@/interfaces/Exam";
import Question from "@/interfaces/question/Question";

/**
 * Create a new exam in the database.
 *
 * @param {Array} quess - List of questions to be added to the exam.
 * @param {string} sessionId - ID of the session or creator.
 */
export const createExamFromQuestions = async (
  quess: Question[],
  sessionId: any
) => {
  await connectMongoDB();

  // Define the exam object.
  const exam: ExamInterface = {
    creatorId: sessionId,
    title: "Exam 1",
    description: "This is an exam",
    questions: quess,
    startTime: new Date(),
    duration: 60,
    allowedAbilities: [
      {
        type: "copy",
        isAllowed: false,
      },
      {
        type: "print",
        isAllowed: true,
      },
    ],
  };

  // Attempt to create the exam in the database.
  try {
    await Exam.create(exam);
    console.log("🚀 Exam creation successful!");

    // Optional: Log all exams in the database.
    const exams = await Exam.find();
    exams.forEach((exam) => {
      console.log("🚀 Exam:", exam);
    });
  } catch (err) {
    console.error("🚀 Error during exam creation:", err);
  }
};

export const createExam = async (exam: ExamInterface, sessionId: any) => {
  await connectMongoDB();
  try {
    const res = await Exam.create(exam);
    console.log("🚀 Exam creation successful!");
    console.log("Exam Id: ", res._id);
  } catch (err) {
    console.error("🚀 Error during exam creation:", err);
  }
};
