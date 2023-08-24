export default function formatTime(time: Date): string {
  if (time === null || time === undefined) return '';
  const meridiem = time.getHours() >= 12 ? 'PM' : 'AM';
  const hours = time.getHours() % 12 === 0 ? 12 : time.getHours() % 12;
  const minutes = time.getMinutes();
  const day = time.getDate();
  const month = time.toLocaleString('default', { month: 'long' }); // Get the full month name

  const daySuffix = getDaySuffix(day); // Function to get the day suffix (st, nd, rd, or th)

  return `${hours}:${minutes
    .toString()
    .padStart(2, '0')} ${meridiem}, ${day}${daySuffix} ${month}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDuration(minutes: string) {
  const minutesInt = parseInt(minutes, 10); // Convert the string to an integer
  const hours = Math.floor(minutesInt / 60);
  const mins = minutesInt % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMins = mins.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMins}`;
}
