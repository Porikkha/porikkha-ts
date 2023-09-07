export default interface ClassroomInterface {
  classroomID: string;
  creatorID: string;
  name: string;
  description: string;
}

export const dummyClassroom: ClassroomInterface = {
  classroomID: '',
  creatorID: '',
  name: 'Classroom Name',
  description: 'Classroom Description',
};
