import { Exam, MultipleChoiceQuestion, ShortAnswerQuestion, SingleChoiceQuestion } from ".";
import { Answer, MultipleChoiceAnswer, ShortAnswerAnswer, SingleChoiceAnswer } from "./question/Answer";

export default interface Submission {
    examId: string,
    userId: string,
    answers: Answer[],
    submissionTime: Date,
    score: number,
}


export function mergeSubmissionWithExam(exam:Exam,submission:Submission) {
    const ques = submission.answers.map((answer, index) => {
      let q = exam.questions[index];
      if (q.type === "multiple-choice")
        (q as MultipleChoiceQuestion).answer = (answer as MultipleChoiceAnswer).answer;
      else if (q.type === "single-choice")
        (q as SingleChoiceQuestion).answer = (answer as SingleChoiceAnswer).answer;
      else if (q.type === "short-answer")
        (q as ShortAnswerQuestion).answer = (answer as ShortAnswerAnswer).answer;
      return q;
    });

    return {...exam,questions:ques} ;
}
