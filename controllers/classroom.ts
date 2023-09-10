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
        type: 'warning',
        message: `Classroom ${classroomID} does not exist`,
      };
    }
    const alreadyExists = await checkAlreadyExisting(classroomID, userID);
    if (alreadyExists) {
      return {
        status: 404,
        type: 'info',
        message: `You are already in Classroom ${classroomID}`,
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
      type: 'success',
      message: `You have been added to Classroom ${classroomID}`,
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
export const updateClassroom = async (
  classroomID: string,
  name: string,
  description: string
) => {
  try {
    await prisma.classroom.update({
      where: {
        classroomID: classroomID,
      },
      data: {
        name: name,
        description: description,
      },
    });
    return {
      status: 200,
      type: 'success',
      message: `Server: Classroom ${classroomID} updated successfully`,
    };
  } catch (err) {
    console.log('👎 Error invoking updateClassroom: ', err);
  }
  return {
    status: 500,
    type: 'error',
    message: `Server: Error invoking updateClassroom`,
  };
};
export const createClassroom = async (classroom: ClassroomInterface) => {
  try {
    await prisma.classroom.create({
      data: {
        classroomID: classroom.classroomID,
        creatorID: classroom.creatorID,
        name: classroom.name,
        description: classroom.description,
        users: {
          connect: {
            userID: classroom.creatorID,
          },
        },
      },
    });
    console.log('✔️ Server: Classroom upsert successful on Prisma!');
    return {
      status: 200,
      classroomID: classroom.classroomID,
    };
  } catch (e) {
    console.log('👎 Error invoking createClassroom: ', e);
  }
  return { status: 500 };
};

export const getAllJoinedClassrooms = async (userID: string) => {
  try {
    const classrooms = await prisma.classroom.findMany({
      where: {
        users: {
          some: {
            userID: userID,
          },
        },
      },
      include: {
        creator: true,
      },
    });
    return { status: 200, classrooms: classrooms };
  } catch (err) {
    console.log('Error invoking getAllJoinedClassrooms: ', err);
  }
  return {
    status: 500,
    message: 'There was an error fetching all joined classrooms',
    type: 'error',
  };
};

export const getClassroom = async (classroomID: string, userID: string) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
        users: {
          some: {
            userID: userID,
          },
        },
      },
      include: {
        exams: true,
      },
    });
    if (classroom === null) {
      console.log('👎 Error invoking getClassroom: Classroom not found in PrismaDB');
      return {
        status: 404,
        type: 'error',
        message: `Classroom ${classroomID} not found! You may not have access to it.`,
      };
    }
    const users = await getUsers(classroomID);
    console.log(users);

    return {
      status: 200,
      classroom: classroom,
      isCreator: classroom.creatorID === userID,
      users: users,
    };
  } catch (e) {
    console.log('Error invoking getClassroom: ', e);
  }
  return { status: 500, type: 'error', message: `Error invoking getClassroom` };
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

export const inviteUserToClassroom = async (params: {
  toUserEmail: string;
  fromUserEmail: string;
  content: string;
}) => {
  try {
    const toUserExists = await prisma.user.findFirst({
      where: {
        email: params.toUserEmail,
      },
    });
    if (toUserExists === null) {
      return {
        status: 404,
        message: `No user with email ${params.toUserEmail} found`,
        type: 'warning',
      };
    }
    await prisma.notification.create({
      data: {
        content: params.content,
        fromUserEmail: params.fromUserEmail,
        toUserEmail: params.toUserEmail,
      },
    });
    return { status: 200, message: 'Invitation sent successfully', type: 'success' };
  } catch (err) {
    console.log('Error invoking inviteUserToClassroom: ', err);
  }
  return {
    status: 500,
    message: `Server: Error invoking inviteUserToClassroom`,
    type: 'error',
  };
};

export async function getUsers(classroomID: any) {
  try {
    const user_count = await prisma.classroom.findUnique({
      where: {
        classroomID: classroomID,
      },
      select: {
        users: {
          select: {
            userID: true,
            username: true,
          },
          take: 4,
        },
        _count: {
          select: {
            users: true,
          },
        },
      },
    });
    // console.log(user_count);
    return user_count;
  } catch (err) {
    return null;
  }
  return null;
}
