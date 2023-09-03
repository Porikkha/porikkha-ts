import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function Calendar() {

  return (
    <div>
      <DateCalendar />
    </div>
  );
}

