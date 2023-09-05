import { connectMongoDB } from '@/utils/database';
import { prisma } from '@/utils/database';
import ClassroomInterface from '@/interfaces/Classroom';
export const upsertClassroom = async (classroom: ClassroomInterface) => {
  try {
    await prisma.classroom.upsert({
      where: {
        classroomID: classroom.classroomID,
      },
      update: classroom,
      create: classroom,
    });
    console.log('✔️ Server: Classroom creation successful on Prisma!');
    return {
      status: 200,
      classroomID: classroom.classroomID,
    };
  } catch (e) {
    console.log('👎 Error invoking createClassroom: ', e);
  }
  return { status: 500 };
};

export const getClassroom = async (classroomID: string) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
    });
    if (classroom === null) {
      console.log('👎 Error invoking getClassroom: Classroom not found in PrismaDB');
      return {
        status: 404,
        message: `Server: Classroom ${classroomID} not found in PrismaDB`,
      };
    }
    return { status: 200, classroom: classroom };
  } catch (e) {
    console.log('Error invoking getClassroom: ', e);
  }
  return { status: 500, message: `Server: Error invoking getClassroom` };
};

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
