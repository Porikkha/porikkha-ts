import { Tooltip, Card, Typography, Button, Avatar, Chip } from '@mui/joy';
import { useRouter } from 'next/navigation';

export default function ClassroomCard({ name, description, creator, classroomID }: any) {
  function getInitials(name: string) {
    const words = name.split(' ');
    if (words.length >= 2) {
      const initials = words
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');
      return initials;
    } else if (words.length === 1) {
      return words[0][0].toUpperCase();
    } else {
      return '';
    }
  }
  const router = useRouter();
  return (
    <Card variant='outlined' sx={{ p: 2, borderColor: 'neutral.outlinedBorder' }}>
      <div className='flex items-center '>
        <Avatar src={creator.image} />
        <Typography className='ml-3 text-sm font-bold'>{name}</Typography>
        <Tooltip variant='soft' className='ml-auto' title={creator.username}>
          <Avatar size='sm'>{getInitials(creator.username)}</Avatar>
        </Tooltip>
      </div>

      <Typography className='mt-1 text-xs'>{description}</Typography>

      <Chip
        className='mt-1'
        variant='soft'
        color='primary'
        size='sm'
        onClick={() => router.push(`/classroom/${classroomID}`)}
      >
        View Classroom
      </Chip>
    </Card>
  );
}
