import { connectMongoDB } from '@/utils/database';
import { prisma } from '@/utils/database';
import ClassroomInterface from '@/interfaces/Classroom';

export const checkAlreadyExisting = async (classroomID: string, userID: string) => {
  const alreadyExists = await prisma.classroom.findUnique({
    where: {
      classroomID: classroomID,
    },
    include: {
      users: {
        where: {
          userID: userID,
        },
      },
    },
  });
  if (alreadyExists?.users.length !== 0) {
    return true;
  }
  return false;
};

export const addUserToClassroom = async (classroomID: string, userID: string) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
    });
    if (classroom === null) {
      return {
        status: 404,
        type: 'error',
        message: `Server: Classroom ${classroomID} does not exist`,
      };
    }
    const alreadyExists = await checkAlreadyExisting(classroomID, userID);
    if (alreadyExists) {
      return {
        status: 404,
        type: 'error',
        message: `Cannot add: User ${userID} already exists in Classroom ${classroomID}`,
      };
    }
    const res = await prisma.classroom.update({
      where: {
        classroomID: classroomID,
      },
      data: {
        users: {
          connect: {
            userID: userID,
          },
        },
      },
    });
    return {
      status: 200,
      type: 'info',
      message: `Server: User ${userID} added to Classroom ${classroomID}`,
    };
  } catch (err) {
    console.log('👎 Error invoking addUserToClassroom: ', err);
  }
  return {
    status: 500,
    type: 'error',
    message: `Server: Error invoking addUserToClassroom`,
  };
};

export const removeUserFromClassroom = async (classroomID: string, userID: string) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
    });
    if (classroom === null) {
      return {
        status: 404,
        type: 'error',
        message: `Server: Classroom ${classroomID} does not exist`,
      };
    }
    const alreadyExists = await checkAlreadyExisting(classroomID, userID);
    if (!alreadyExists) {
      return {
        status: 404,
        type: 'error',
        message: `Cannot remove: User ${userID} does not exist in Classroom ${classroomID}`,
      };
    }
    const res = await prisma.classroom.update({
      where: {
        classroomID: classroomID,
      },
      data: {
        users: {
          disconnect: {
            userID: userID,
          },
        },
      },
    });
    return {
      status: 200,
      type: 'info',
      message: `Server: User ${userID} removed from Classroom ${classroomID}`,
    };
  } catch (err) {
    console.log('👎 Error invoking removeUserFromClassroom: ', err);
  }
  return {
    status: 500,
    type: 'error',
    message: `Server: Error invoking removeUserFromClassroom`,
  };
};

export const upsertClassroom = async (classroom: ClassroomInterface) => {
  try {
    await prisma.classroom.upsert({
      where: {
        classroomID: classroom.classroomID,
      },
      update: classroom,
      create: classroom,
    });
    console.log('✔️ Server: Classroom upsert successful on Prisma!');
    return {
      status: 200,
      classroomID: classroom.classroomID,
    };
  } catch (e) {
    console.log('👎 Error invoking upsertClassroom: ', e);
  }
  return { status: 500 };
};

export const getClassroom = async (classroomID: string) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
      include: {
        exams: true,
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

export const addExamToClassroom = async (params: {
  examID: string;
  classroomID: string;
  userID: string;
}) => {
  const { examID, classroomID, userID } = params;
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        examID: examID,
        creatorID: userID,
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
