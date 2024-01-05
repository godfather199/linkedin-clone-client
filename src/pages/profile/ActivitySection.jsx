import {PostActivitySection} from '../'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ActivitySection({userDetails}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mb-[1.7rem] p-5 bg-white rounded-[0.6rem] border border-gray-300">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">Activity</span>
        <span className="text-gray-400 text-md">{userDetails?.followers?.length} follower</span>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Posts" {...a11yProps(0)} />
            {/* <Tab label="Images" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PostActivitySection details = {userDetails} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <span className="">Image section</span>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
