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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
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
                OK
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    );
  }
  