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

export default function InviteModal({ open, setOpen, values, setters }: any) {
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const res = await fetch(`/api/classroom/invite`, {
      method: 'POST',
      body: JSON.stringify({
        toUserEmail: email,
        content: `You have been invited to join ${values.classroomName} classroom. Please join using the code: ${values.classroomID}`,
      }),
    });
    const body = await res.json();
    setOpen(false);
    setters.setAlertType(body.type);
    setters.setAlertText(body.message);
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
          Invite Students to Your Classroom
        </Typography>
        <Typography id='basic-modal-dialog-description'>
          Enter email address of the student you want to invite.
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoFocus
                required
                type='email'
                name='email'
              />
            </FormControl>
            <Button type='submit' variant='soft'>
              Invite
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
