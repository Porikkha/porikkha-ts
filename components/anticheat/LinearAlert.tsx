import { LinearProgress } from '@mui/material';

const LinearAlert = ({
  progress,
  showLinearAlert,
}: {
  progress: number;
  showLinearAlert: boolean;
}) => {
  return (
    showLinearAlert && (
      <div className='fixed left-1/2 top-1/2 z-50 w-1/4 -translate-x-1/2 -translate-y-1/2 transform'>
        <div className="customAlertBox">
          <h3>Please return to your exam</h3>
          <LinearProgress variant='determinate' value={progress} />
        </div>
      </div>
    )
  );
};

export default LinearAlert;
