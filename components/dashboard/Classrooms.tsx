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
  const fetchClassrooms = async () => {
    const res = await fetch('/api/classroom');
    const data = await res.json();
    if (data.status === 200) setClassrooms(data.classrooms);
    else alert('Something went wrong while fetching classrooms');
  };
  useEffect(() => {
    fetchClassrooms();
  }, []);
  return (
    <>
      <QuickJoinClassroom />
      <div className='flex flex-col space-y-5 '>
        {classrooms.map((classroom) => (
          <div>
            <ClassroomCard
              name={classroom.name}
              description={classroom.description}
              creator={classroom.creator}
              classroomID={classroom.classroomID}
            />
          </div>
        ))}
      </div>
    </>
  );
}
