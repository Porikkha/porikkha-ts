export function createData(
  name: string,
  answered: string,
  correct: number,
  marks: number,
  integrityScore: number,
  totalMarks: number,
  examID: string,
  studentID: string
) {
  return { name, answered, correct, marks, integrityScore, totalMarks, examID, studentID };
}
export function arange(start: number, stop: number, step = 1) {
  if (arguments.length === 1) {
    stop = start;
    start = 0;
  }
  const length = Math.ceil((stop - start) / step);
  return Array.from({ length }, (_, i) => start + i * step);
}

export function createMarkDistribution(rows: any, buckets = 10) {
  const bucketWidth = 100 / buckets;
  const yData = new Array(buckets + 1).fill(0);
  const xAxis = Array.from({ length: buckets + 1 }, (_, i) => i * bucketWidth);

  rows.forEach((row: any) => {
    console.log(row.achievedMarks);
    const percentAchieved = (row.achievedMarks / row.exam.totalMarks) * 100;
    const bucketIndex = Math.min(Math.floor(percentAchieved / bucketWidth), buckets);
    yData[bucketIndex]++;
  });

  return { xAxis, yData };
}
