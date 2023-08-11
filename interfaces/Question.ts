import { Document } from "mongoose";

export interface Choice {
  text: string;
  id: number;
}

export default interface Question extends Document {
  title: string;
  description?: string;
  choices: Choice[];
  type: "single-choice" | "multiple-choice" | "short-answer";
  points: number;
  answerId: number[];
};