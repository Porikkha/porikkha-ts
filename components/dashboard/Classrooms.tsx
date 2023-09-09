import ClassroomCard from './ClassroomCard';
import { useState, useEffect } from 'react';
import QuickJoinClassroom from './QuickJoinClassroom';
export default function Classrooms() {
  type Classroom = {
    name: string;
    description: string;
    creator: any;
    classroomID: string;
  };
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const fetchClassrooms = async () => {};
  return (
    <>
      <QuickJoinClassroom />
      <ClassroomCard
        name='Classroom 1'
        description='Sample description'
        creator='Shuaib'
        classroomID='123456'
      />
    </>
  );
}
