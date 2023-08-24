import { CircularProgress } from '@mui/joy';

export default function Loading() {
  return (
    <div className='flex w-full justify-center py-10'>
      {' '}
      <CircularProgress variant='soft' />{' '}
    </div>
  );
}
