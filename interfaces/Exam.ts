export default interface Exam{
  creatorId: string,
  title: string,
  description: string ,
  questions: Object[],
  startTime: Date,
  duration: Number,
  allowedAbilities: Object[],
};
