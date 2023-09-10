import {
  DiscussionThreadInterface,
  PostInterface,
  ReplyInterface,
} from '@/interfaces/DiscussionThread';
import { prisma } from '@/utils/database';

export const createDiscussionThread = async (
  discussionThread: DiscussionThreadInterface
) => {
  try {
    const res = await prisma.discussionThread.create({
      data: discussionThread,
    });
    return {
      status: 200,
      type: 'success',
      message: `Server: Discussion Thread ${discussionThread.title} created`,
    };
  } catch (err: any) {
    return {
      status: 500,
      type: 'error',
      message: `Server: Error during Discussion Thread creation: ${err}`,
    };
  }
};

export const getDiscussionThread = async (discussionThreadID: bigint) => {
  try {
    const discussionThread = await prisma.discussionThread.findUnique({
      where: {
        discussionThreadID: discussionThreadID,
      },
      include: {
        Post: {
          include: {
            Reply: true,
          },
        },
      },
    });

    if (discussionThread === null) {
      return {
        status: 404,
        type: 'error',
        message: `Server: Discussion Thread ${discussionThreadID} does not exist`,
      };
    }
    return {
      status: 200,
      type: 'success',
      message: `Server: Discussion Thread ${discussionThreadID} found`,
      data: discussionThread,
    };
  } catch (err: any) {
    return {
      status: 500,
      type: 'error',
      message: `Server: Error during Discussion Thread fetch: ${err}`,
    };
  }
};

export const getDiscussionThreadsByClassroomID = async (classroomID: string) => {
  try {
    const discussionThreads = await prisma.discussionThread.findMany({
      where: {
        classroomID: classroomID,
      },
    });
    console.log("🚀 ~ file: discussionThread.ts ~ line 100 ~ getDiscussionThreadsByClassroomID ~ discussionThreads", discussionThreads)
    return {
      status: 200,
      type: 'success',
      message: `Server: Discussion Threads for Classroom ${classroomID} found`,
      data: discussionThreads,
    };
  } catch (err: any) {
    return {
      status: 500,
      type: 'error',
      message: `Server: Error during Discussion Thread fetch: ${err}`,
    };
  }
};

export const createPost = async (post: PostInterface) => {
  try {
    const res = await prisma.post.create({
      data: post,
    });
    return {
      status: 200,
      type: 'success',
      message: `Server: Post ${post.content} created`,
    };
  } catch (err: any) {
    return {
      status: 500,
      type: 'error',
      message: `Server: Error during Post creation: ${err}`,
    };
  }
};

export const createReply = async (reply: ReplyInterface) => {
  try {
    const res = await prisma.reply.create({
      data: reply,
    });
    return {
      status: 200,
      type: 'success',
      message: `Server: Reply ${reply.content} created`,
    };
  } catch (err: any) {
    return {
      status: 500,
      type: 'error',
      message: `Server: Error during Reply creation: ${err}`,
    };
  }
};
