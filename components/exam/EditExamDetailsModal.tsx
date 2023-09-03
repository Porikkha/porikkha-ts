import {
  Input,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Alert
} from '@mui/joy';


export default function EditExamDetailsModal({ open, setOpen, values, setters }: any) {

  // check if the start time is valid
  const isStartTimeValid = () => {
    const startTime = new Date(values.startTime);
    const now = new Date();
    return startTime > now;
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby='basic-modal-dialog-title'
        aria-describedby='basic-modal-dialog-description'
        sx={{ width: 600 }}
      >
        <Typography id='basic-modal-dialog-title' level='h2'>
          Enter Exam Details
        </Typography>
        <Typography id='basic-modal-dialog-description'>
          Fill in the information of the exam.
        </Typography>
        { !isStartTimeValid() && <Alert variant="soft" color="danger"> Invalid Date </Alert> }
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            const formattedTime = new Date(values.startTime).toLocaleString();
            setters.setStartTimeFormatted(formattedTime);
          }}
        >

          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                required
                value={values.examName}
                onChange={(e) => setters.setExamName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                required
                value={values.examDesc}
                onChange={(e) => setters.setExamDesc(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type='datetime-local'
                value={values.startTime}
                onChange={(e) => setters.setStartTime(e.target.value)}
              />
            </FormControl>
            <Button type='submit' variant='soft'>
              OK
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
