import { Card, Typography, Button, Avatar } from '@mui/joy';
import { useRouter } from 'next/navigation';

export default function ClassroomCard({ name, description, creator, classroomID }: any) {
  const router = useRouter();
  return (
    <Card variant='outlined' sx={{ p: 2, borderColor: 'neutral.outlinedBorder' }}>
      <div className='flex items-center'>
        <Avatar src={creator.avatar} />
        <Typography level='h4' className='ml-3'>
          {name}
        </Typography>
        <Typography className='ml-auto'>{creator.name}</Typography>
      </div>

      <Typography className='mt-2'>{description}</Typography>

      <Button
        className='mt-4'
        variant='soft'
        color='primary'
        onClick={() => router.push(`/classroom/${classroomID}`)}
      >
        View Classroom
      </Button>
    </Card>
  );
}
