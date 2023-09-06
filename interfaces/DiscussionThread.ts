export interface DiscussionThreadInterface {
  classroomID: string;
  creatorID: string;
  title: string;
  content: string;
}

export interface PostInterface {
    creatorID: string;
    threadID: bigint;
    content: string;
}

export interface ReplyInterface {
    creatorID: string;
    postID: bigint;
    content: string;
}

export const dummyDiscussionThread: DiscussionThreadInterface = {
  classroomID: '',
  creatorID: '',
  title: 'Discussion Thread Title',
  content: 'Discussion Thread Content',
};
