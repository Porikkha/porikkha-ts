import { Schema, model, models } from 'mongoose';
import Question from '@/models/questions';
import Submission from '@/interfaces/Submission';

const submissionSchema = new Schema<Submission>({
  examId: { type: String, required: true },
  userId: { type: String, required: true }, 
  answers: [Object],
  submissionTime: { type: Date, required: true },
  score: { type: Number, required: true },
});
// submissionSchema.index({ examId: 1, userId: 1}, { unique: true });

const Submission = models.Submission || model('Submission', submissionSchema);

export default Submission;
