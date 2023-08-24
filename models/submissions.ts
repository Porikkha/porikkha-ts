import { Schema, model, models } from 'mongoose';
import Question from '@/models/questions';
import Submission from '@/interfaces/Submission';

const submissionSchema = new Schema<Submission>({
  examID: { type: String, required: true },
  userID: { type: String, required: true },
  answers: [Object],
  submissionTime: { type: Date, required: true },
  score: { type: Number, required: true },
});
// submissionSchema.index({ examID: 1, userID: 1}, { unique: true });

const Submission = models.Submission || model('Submission', submissionSchema);

export default Submission;
