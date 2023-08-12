export default interface Question {
  id: number; 
  title: string;
  type: "single-choice" | "multiple-choice" | "short-answer";
  points: number;
};
