import Alert from '@mui/material/Alert';
const FailedAlert = ({
  showSuccessAlert,
  setShowSuccessAlert,
}: {
  showSuccessAlert: boolean;
  setShowSuccessAlert: any;
}) => {
  return (
    showSuccessAlert && (
      <div className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
        <Alert severity='error' onClose={() => setShowSuccessAlert(false)}>
            Invalid Time. Please check if the time is set to a previous date from now.  
        </Alert>
      </div>
    )
  );
};

export default FailedAlert;
