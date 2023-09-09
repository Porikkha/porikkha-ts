import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Calendar from './Calendar';
import PublishedResults from './PublishedResults';
import Notifications from './Notifications';

export default function TabsSegmentedControls() {
  return (
    <Tabs aria-label='tabs' defaultValue={0} sx={{ bgcolor: 'transparent' }}>
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: 'background.level1',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
          },
        }}
      >
        <Tab disableIndicator>Calendar</Tab>
        <Tab disableIndicator>Notifications</Tab>
        <Tab disableIndicator>Results</Tab>
        <Tab disableIndicator>Rooms</Tab>
      </TabList>
      <TabPanel value={0}>
        <Calendar />
      </TabPanel>
      <TabPanel value={1}>
        <Notifications />
      </TabPanel>
      <TabPanel value={2}>
        <PublishedResults />
      </TabPanel>
    </Tabs>
  );
}
