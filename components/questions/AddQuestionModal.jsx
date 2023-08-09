
import { Input, Typography, Modal, ModalDialog, Stack, FormControl, FormLabel, Button } from "@mui/joy";
import EditMultipleChoice from "./EditMultipleChoice";

const qdata = {
  NUMBER : 1,
  QUESTION: "What is the capital of Dubai?",
  OPTIONS: ["Abu Dhabi", "Dhaka", "Delhi", "Kabul"],
}

export default function AddQuestionModal({open, setOpen, addQuestion}) {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width:800 }}
        >
          <Typography id="basic-modal-dialog-title" level="h2">
            Add a new question.
          </Typography>
          <Typography id="basic-modal-dialog-description">
            Fill in the information of the question
          </Typography>
            <EditMultipleChoice qdata={qdata} addQuestion={addQuestion}/>
        </ModalDialog>
      </Modal>
    )
}