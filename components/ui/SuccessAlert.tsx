import Alert from '@mui/material/Alert';
const SuccessAlert = ({
  showSuccessAlert,
  setShowSuccessAlert,
}: {
  showSuccessAlert: boolean;
  setShowSuccessAlert: any;
}) => {
  return (
    showSuccessAlert && (
      <div className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'>
        <Alert severity='success' onClose={() => setShowSuccessAlert(false)}>
          Exam saved successfully!
        </Alert>
      </div>
    )
  );
};

export default SuccessAlert;
