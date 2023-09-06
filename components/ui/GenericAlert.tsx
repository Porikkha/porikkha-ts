import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

interface GenericAlertProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: AlertColor;
  text: string;
}

const GenericAlert: React.FC<GenericAlertProps> = ({
  show,
  setShow,
  type,
  text,
}) => {
  return (
    show && (
      <div className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
        <Alert severity={type} onClose={() => setShow(false)}>
          {text}
        </Alert>
      </div>
    )
  );
};

export default GenericAlert;
