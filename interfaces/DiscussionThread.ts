export default interface DiscussionThreadInterface {
  classroomID: string;
  creatorID: string;
  title: string;
  content: string;
}

export const dummyDiscussionThread: DiscussionThreadInterface = {
  classroomID: '',
  creatorID: '',
  title: 'Discussion Thread Title',
  content: 'Discussion Thread Content',
};
