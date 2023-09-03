import {
  Input,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  FormControl,
  FormLabel,
  Button,
} from '@mui/joy';

export default function EditExamDetailsModal({ open, setOpen, values, setters }: any) {
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
              <input
                type='datetime-local'
                value={values.startTime}
                onChange={(e) => {
                  const pickedDateConverted = new Date(e.target.value);
                  const curDate = new Date();
                  if (pickedDateConverted < curDate)
                    setters.setStartTime(curDate.toISOString());
                  else 
                  setters.setStartTime(e.target.value);
                }}
                min={new Date().toISOString().slice(0, 16)}
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
