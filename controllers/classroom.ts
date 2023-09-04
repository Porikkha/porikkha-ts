import { connectMongoDB } from '@/utils/database';
import { prisma } from '@/utils/database';

export const checkIfExamExists = async (examID: string) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
    });
    if (exam === null) {
      return { status: 404, message: `Server: Exam ${examID} not found in PrismaDB` };
    }
    return { status: 200, message: `Server: Exam ${examID} found in PrismaDB` };
  } catch (e) {
    console.log('Error invoking checkIfExamExists: ', e);
  }
  return { status: 500, message: `Server: Error invoking checkIfExamExists` };
};

export const addExamToClassroom = async (examID: string, classroomID: string) => {
  try {
    await connectMongoDB();
    const exam = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
    });
    if (exam === null) {
      return { status: 404, message: `Server: Exam ${examID} not found in PrismaDB` };
    }
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
    });
    if (classroom === null) {
      return {
        status: 404,
        message: `Server: Classroom ${classroomID} not found in PrismaDB`,
      };
    }
    const res = await prisma.classroom.update({
      where: {
        classroomID: classroomID,
      },
      data: {
        exams: {
          connect: {
            examID: examID,
          },
        },
      },
    });
    return {
      status: 200,
      message: `Server: Exam ${examID} added to Classroom ${classroomID}`,
    };
  } catch (e) {
    console.log('Error invoking addExamToClassroom: ', e);
  }
  return { status: 500, message: `Server: Error invoking addExamToClassroom` };
};
