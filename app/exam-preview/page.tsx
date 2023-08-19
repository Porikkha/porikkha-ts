'use client'
import { useState } from "react";
import { Modal, Typography, Stack, FormControl, FormLabel, Input, Button } from "@mui/joy";

const ExamBanner = () => {
  const title = "Operating Systems - Quiz I";
  const totalTime = "30:00";
  const startTime = "10:00 AM";
  const endTime = "10:30 AM";
  const description =
    "Once you start, you can't pause the timer. Don't worry, Forms gives you a final minute reminder before submission. Your answers will be automatically submitted when the time is up. Please prepare before you begin to help manage your submission time.";
  const remainingTime = "15:00";
  const [open, setOpen] = useState(false);

  return (
    <section className="w-4/5 bg-purple-100 rounded-xl m-8">
      <div className="bg-purple-400/20 text-violet-900 rounded-xl p-4">
        <h1 className="text-3xl font-bold px-4">{title}</h1>
      </div>
      <div className="p-5">
        <div className="flex justify-between space-x-4">
          <div className="font-semibold text-sm bg-purple-500/40 p-2 px-5 rounded-full text-violet-950">
            Total Time: {totalTime}
          </div>
          <div className="font-semibold text-sm bg-purple-500/40 p-2 px-5 rounded-full text-violet-950">
            Start Time: {startTime}
          </div>
          <div className="font-semibold text-sm bg-purple-500/40 p-2 px-5 rounded-full text-violet-950">End Time: {endTime}</div>
        </div>
        <p className="text-gray-700 mb-4 mt-4 font-semibold">{description}</p>
      <div className="flex items-center">
        <button onClick={() => setOpen(true)} className="my-5 reminder_btn">
          Add Reminder
        </button>
        <div className="px-5 flex items-center">
          <span className="font-semibold text-slate-900">Remaining Time:</span>
          <span className="text-orange-600 ml-2">{remainingTime}</span>
        </div>
      </div>

      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          aria-labelledby="reminder-modal-dialog-title"
          aria-describedby="reminder-modal-dialog-description"
          className="bg-white p-8 rounded-xl max-w-md mx-auto transform translate-y-1/2"
        >
          <Typography id="reminder-modal-dialog-title" level="h2">
            Add Reminder
          </Typography>
          <Typography id="reminder-modal-dialog-description">
            We will remind you at the specified time.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Remind me at:</FormLabel>
                <Input type="datetime-local" required />
              </FormControl>
              <FormControl>
                <FormLabel>Message</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit" variant="soft">
                Set Reminder
              </Button>
            </Stack>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default ExamBanner;
