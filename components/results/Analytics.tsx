import { Typography, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import CustomCircularProgress from '../ui/CustomCircularProgress';
export default function Analytics({ values, avgIntegrity }: any) {
  function getAvgMarks() {
    let sum = 0,
      cnt = 0;
    for (let i = 0; i < values.yData.length; i++) {
      cnt += values.yData[i];
      sum += values.yData[i] * values.xAxis[i];
    }
    return sum / cnt;
  }

  function getMedianFromFrequencyDistribution() {
    const sortedData = [];

    for (let i = 0; i < values.xAxis.length; i++) {
      for (let j = 0; j < values.yData[i]; j++) {
        sortedData.push(values.xAxis[i]);
      }
    }

    sortedData.sort((a, b) => a - b);

    const middleIndex = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      // If the number of values is even, return the average of the two middle values
      const middleValue1 = sortedData[middleIndex - 1];
      const middleValue2 = sortedData[middleIndex];
      return (middleValue1 + middleValue2) / 2;
    } else {
      // If the number of values is odd, return the middle value
      return sortedData[middleIndex];
    }
  }

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
          <CustomCircularProgress value={avgIntegrity} label={'Integrity Score'} />
          <CustomCircularProgress value={getAvgMarks()} label={'Avg Marks'} />
          <CustomCircularProgress value={getMedianFromFrequencyDistribution()} label={'Median'} />
        </Paper>
      </div>
    </>
  );
}
