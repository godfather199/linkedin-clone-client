import {SearchBar, NavbarMenu} from '../'
import { NotificationHome } from '../../pages';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Tooltip } from '@mui/material';
import { clear_All_Notifications } from '../../store/slices/notificationSlice';
import MessageIcon from '@mui/icons-material/Message';


function Navbar() {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  // console.log('Pathname: ', params)

  const {currentUser} = useSelector(state => state.user)
  const {notifications} = useSelector(state => state.notification)


  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationMenu, setNotificationMenu] = useState(null);
  // console.log('Value: ', anchorEl)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleNotificationClick = (event) => {
    setNotificationMenu(event.currentTarget);
  };



  const handleNotificationClose = () => {
    setNotificationMenu(null);
  };



  return (
    <>
      <div
        // style={{ border: "3px solid red" }}
        className={` ${
          pathname === "/" ? "hidden" : null
        } flex items-center justify-center p-4 bg-gray-400 sticky top-0 z-50 shadow-lg`}
      >
        <div
          // style={{ border: "5px solid purple" }}
          className=" relative w-full  max-h-[5rem] flex items-center justify-between"
        >
          <div className="">
            <Link to={"/feed"}>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  // class="mercado-match"
                  // color="blue"
                  className=" text-blue-800 bg-white"
                  width="60"
                  height="60"
                  focusable="false"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </div>
            </Link>
            <div className="absolute top-3 left-[5rem] md:left-[7rem]">
              {pathname !== "/messages" && <SearchBar />}
            </div>
          </div>
          <div
            // style={{ border: "3px solid green" }}
            className="flex items-center justify-between  w-[16rem]"
          >
            <div
              // style={{ border: "3px solid red" }}
              className="flex items-center justify-between w-[9rem]"
            >
              <Link to={`/jobs`}>
                <div className="flex flex-col">
                  <Tooltip title="Jobs" arrow>
                    <WorkIcon style={{ color: "white", fontSize: "2.2rem" }} />
                  </Tooltip>
                  {/* <span className="">Jobs</span> */}
                </div>
              </Link>
              <Link to={`/messages`}>
                <div className="flex flex-col">
                  <Tooltip title="Messages" arrow>
                    <MessageIcon
                      style={{ color: "white", fontSize: "2.2rem" }}
                    />
                  </Tooltip>
                  {/* <span className="">Jobs</span> */}
                </div>
              </Link>
              <div className="flex">
                <Badge
                  badgeContent={notifications.length}
                  color="primary"
                  invisible={notifications?.length === 0}
                >
                  <Tooltip title="Notifications" arrow>
                    <NotificationsIcon
                      onClick={handleNotificationClick}
                      style={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: "2.2rem",
                      }}
                    />
                  </Tooltip>
                </Badge>
                {/* <button
                  className=""
                  onClick={() => dispatch(clear_All_Notifications())}
                >
                  Clear all
                </button> */}
                <NotificationHome
                  notificationMenu={notificationMenu}
                  handleNotificationClose={handleNotificationClose}
                />
              </div>
            </div>
            <div className="mr-[1rem] cursor-pointer">
              <div
                // style={{ border: "3px solid green" }}
                className=" flex flex-col items-center justify-center"
                onClick={handleClick}
              >
                {currentUser?.avatar?.url ? (
                  <img
                    src={currentUser?.avatar?.url}
                    alt=""
                    className="h-[3rem] w-[3rem] rounded-full object-cover shadow-lg border-2 border-blue-600"
                  />
                ) : (
                  <AccountCircleIcon style={{ fontSize: "2.2rem" }} />
                )}
                <div className="flex items-center justify-center">
                  <span className="text-white">Me</span>
                  <ArrowDropDownIcon style={{ color: "white" }} />
                </div>
              </div>
              <NavbarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar



