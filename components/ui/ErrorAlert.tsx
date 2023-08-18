import Alert from '@mui/material/Alert';
const ErrorAlert = ({
  showErrorAlert,
  setShowErrorAlert,
}: {
  showErrorAlert: boolean;
  setShowErrorAlert: any;
}) => {
  return (
    showErrorAlert && (
      <div className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
        <Alert severity='error' onClose={() => setShowErrorAlert(false)}>
          Something went wrong!
        </Alert>
      </div>
    )
  );
};

export default ErrorAlert;
