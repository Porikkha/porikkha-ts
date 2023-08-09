"use server";

import { connectMongoDB } from "@/utils/database";
import Exam, { ExamInterface } from "@/models/exams";

/**
 * Create a new exam in the database.
 *
 * @param {Array} quess - List of questions to be added to the exam.
 * @param {string} sessionId - ID of the session or creator.
 */
export const createExam = async (quess:any, sessionId:any) => {
  await connectMongoDB();

  // Transform the provided questions into the desired format.
  const questions = quess.map((question:any) => {
    const choices = question.OPTIONS.map((choice:any, index:any) => ({
      text: choice,
      id: index + 1,
    }));

    return {
      title: question.QUESTION,
      description: "This is a question",
      choices: choices,
      type: "single-choice",
      points: 1,
      answerId: [1],
    };
  });

  // Define the exam object.
  const exam:ExamInterface =  {
    creatorId: sessionId,
    title: "Exam 1",
    description: "This is an exam",
    questions: questions,
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
