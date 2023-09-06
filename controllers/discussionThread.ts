import DiscussionThreadInterface from '@/interfaces/DiscussionThread';
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