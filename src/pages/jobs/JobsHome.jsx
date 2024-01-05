import {Jobs, NewJobPage} from '../'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  thunk_Fetch_All_Jobs,
  thunk_Fetch_All_Jobs_Applied_To_By_User,
  thunk_Fetch_All_Jobs_Created_By_User,
} from "../../store/thunks/jobThunk";
import { thunk_Logged_In_User_Info } from '../../store/slices/userSlice';
import RecommendIcon from '@mui/icons-material/Recommend';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useWindowSize from '../../hooks/useWindowSize';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      // style={{border: '5px solid purple'}}
      className='w-[90%]'
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}




export default function JobsHome() {
  const dispatch = useDispatch()

  const width = useWindowSize();
  
  const {jobs, isLoading} = useSelector(state => state.job)
  const {currentUser} = useSelector(state => state.user)


  const [value, setValue] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([])

  // console.log('Jobs: ', jobs)


  // Remove 'currentUser' jobs from all jobs
  useEffect(() => {
    if(value === 0) {
      setFilteredJobs(jobs.filter(item => item?.jobAuthor !== currentUser?._id))
    }

    return () => setFilteredJobs([])
  }, [jobs])

  
  // Fetch all Jobs
  useEffect(() => {
    if(value === 0) {
      dispatch(thunk_Fetch_All_Jobs());
    }
    else if(value === 1) {
      dispatch(thunk_Fetch_All_Jobs_Created_By_User())
      dispatch(thunk_Logged_In_User_Info())
    }
    else {
      dispatch(thunk_Fetch_All_Jobs_Applied_To_By_User())
      dispatch(thunk_Logged_In_User_Info())
    }
  }, [value]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const render_Tab_Label = (label) => {
    if (width > 1200) {
      return <span>{label}</span>;
    }
    return null;
  };


 
  return (
    <div
      style={{
        // border: "5px solid red",
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
      }}
    >
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          // border: "5px solid blue",
          borderRight: 1,
          borderColor: "divider",
          // width: '20rem',
          minWidth: '4rem'
        }}
      >
        <Tab
          sx={{
            // border: "3px solid purple",
            // minWidth: '30rem',
            display: "flex",
            alignContent: "center",
            justifyContent: "flex-start",
            
          }}
          // className=' w-[20rem]'
          icon={<RecommendIcon style={{ color: "red" }} />}
          iconPosition="start"
          label={render_Tab_Label('Jobs Recommended')}
          // label="Jobs Recommended"
          {...a11yProps(0)}
        />

        <Tab
          sx={{
            // border: "3px solid purple",
            width: "full",
            display: "flex",
            justifyContent: "flex-start",
          }}
          icon={<BorderColorIcon style={{ color: "red" }} />}
          iconPosition="start"
          label={render_Tab_Label("Jobs Created")}
          // label="Jobs Created"
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            // border: "3px solid purple",
            width: "full",
            display: "flex",
            justifyContent: "flex-start",
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="red"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM14 7h-4v4H8v2h2v4h4v-4h2v-2h-2V7z" />
            </svg>
          }
          iconPosition="start"
          label={render_Tab_Label("Jobs Applied To")}
          // label="Jobs Applied To"
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            // border: "3px solid purple",
            width: "full",
            display: "flex",
            justifyContent: "flex-start",
          }}
          icon={<NoteAddIcon style={{ color: "red" }} />}
          iconPosition="start"
          label={render_Tab_Label("Create New Job")}
          // label="Create New Job"
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Jobs
          isLoading={isLoading}
          jobs={filteredJobs}
          title="Recommended Jobs For You"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Jobs isLoading={isLoading} jobs={jobs} title="Jobs Created By You" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Jobs
          isLoading={isLoading}
          jobs={jobs}
          title="Jobs You Have Applied To"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <NewJobPage setValue={setValue} />
      </TabPanel>
    </div>
  );
}
