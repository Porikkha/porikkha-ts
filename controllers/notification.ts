import { prisma } from '@/utils/database';

export const getAllNotifications = async (userEmail: string) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        toUserEmail: userEmail,
      },
      include: {
        fromUser: {
          select: {
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        isRead: 'asc',
      },
    });
    return { status: 200, notifications: notifications };
  } catch (err) {
    console.log('Error invoking getAllNotifications: ', err);
  }
  return {
    status: 500,
    message: 'There was an error fetching notifications',
    type: 'error',
  };
};

export const markRead = async (notificationID: string) => {
  try {
    await prisma.notification.update({
      where: {
        notificationID: notificationID,
      },
      data: {
        isRead: true,
      },
    });
    return { status: 200, message: 'Notification marked as unread', type: 'success' };
  } catch (err) {
    console.log('Error invoking markUnread: ', err);
  }
  return {
    status: 500,
    message: 'There was an error marking notification as unread',
    type: 'error',
  };
};
