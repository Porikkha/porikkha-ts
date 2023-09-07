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
  classroomID: 'JurZEA',
  creatorID: 'fde2bfd0-be39-42bf-84e6-b507a0aa7cbd',
  title: 'Date of 2nd Physics CT',
  content: 'The 2nd Physics CT will be on 10/10/2021. Please be prepared! The syllabus is up to the 32nd page.',
};
