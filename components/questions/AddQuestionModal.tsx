import { Input, Typography, Modal, ModalDialog, Stack, FormControl, FormLabel, Button } from "@mui/joy";
import EditMultipleChoice from "./EditMultipleChoice";
import Question from "@/interfaces/Question";
import { dummyQuestions } from "@/interfaces/Question";


export default function AddQuestionModal({open, setOpen, addQuestion}:any) {
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
            <EditMultipleChoice qdata={dummyQuestions[0]} addQuestion={addQuestion}/>
        </ModalDialog>
      </Modal>
    )
}