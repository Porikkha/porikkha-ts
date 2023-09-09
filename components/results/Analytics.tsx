import { Typography, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import CustomCircularProgress from '../ui/CustomCircularProgress';
export default function Analytics({ values }: any) {
  return (
    <>
      <div>
        <Typography align='center' className='pb-2 font-inter text-3xl text-slate-700'>
          {values.title}
        </Typography>
      </div>
      <div>
        <Paper>
          <LineChart
            xAxis={[{ data: values.xAxis }]}
            series={[
              {
                data: values.yData,
              },
            ]}
            width={600}
            height={300}
          />
        </Paper>
      </div>
      <div>
        <Paper>
          <CustomCircularProgress value={90} label={'Integrity Score'} />
          <CustomCircularProgress value={40} label={'Marks'} />
          <CustomCircularProgress value={60} label={'Answered'} />
        </Paper>
      </div>
    </>
  );
}
