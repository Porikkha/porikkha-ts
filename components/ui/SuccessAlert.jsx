import Alert from "@mui/material/Alert";
const SuccessAlert = ({ showSuccessAlert, setShowSuccessAlert }) => {
  return (
    showSuccessAlert && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Exam saved successfully!
        </Alert>
      </div>
    )
  );
};

export default SuccessAlert;
