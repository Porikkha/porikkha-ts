import { Card, Typography, Chip, Avatar } from '@mui/joy';

export default function NotificationCard({
  notificationID,
  from,
  content,
  timestamp,
  isRead,
}: any) {
  const handleClick = async () => {
    const res = await fetch('/api/notifications', {
      method: 'PUT',
      body: JSON.stringify({
        notificationID: notificationID,
      }),
    });
    const data = await res.json();
    console.log("Response from markUnread:", data);
  };
  return (
    <Card
      className={`rounded-md p-2 ${isRead ? 'bg-neutral-100' : 'bg-neutral-50'}`}
      variant='outlined'
      sx={{ borderColor: 'neutral.outlinedBorder' }}
    >
      <div className='flex items-center'>
        <Avatar src={from.image} alt={from.username} />
        <Typography className='text-semibold ml-3 text-sm text-slate-500'>
          {from.username}
        </Typography>
        <Typography className='ml-auto text-sm'>{timestamp}</Typography>
      </div>

      <Typography className='mt-2 text-xs'>{content}</Typography>

      {!isRead && (
        <Chip
          className='mt-2'
          color='primary'
          size='sm'
          variant='outlined'
          onClick={handleClick}
        >
          Unread
        </Chip>
      )}
    </Card>
  );
}
