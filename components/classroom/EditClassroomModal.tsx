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

export default function EditClassroomModal({ open, setOpen, values, setters }: any) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/classroom`, {
      method: 'POST',
      body: JSON.stringify({
        classroomID: values.classroomID,
        name: values.classroomName,
        description: values.classroomDesc,
      }),
    });
    const data = await res.json();
    setOpen(false);
    setters.setAlertType(data.type);
    setters.setAlertText(data.message);
    setters.setShowAlert(true);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby='basic-modal-dialog-title'
        aria-describedby='basic-modal-dialog-description'
        sx={{ width: 600 }}
      >
        <Typography id='basic-modal-dialog-title' level='h2'>
          Enter Classroom Details
        </Typography>
        <Typography id='basic-modal-dialog-description'>
          Fill in the information of the classroom.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                required
                value={values.classroomName}
                onChange={(e) => setters.setClassroomName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                required
                value={values.classroomDesc}
                onChange={(e) => setters.setClassroomDesc(e.target.value)}
              />
            </FormControl>
            <Button type='submit' variant='soft'>
              Save
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
