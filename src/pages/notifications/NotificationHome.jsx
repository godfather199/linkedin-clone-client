import { socket } from "../../App"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { add_New_Notification, delete_Follow_Notification, delete_Job_Notification, delete_Notification } from "../../store/slices/notificationSlice";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";




export default function NotificationHome({
  notificationMenu,
  handleNotificationClose,
}) {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notification);
  // console.log("NotificationHome: ", notifications)
  const { currentUser } = useSelector((state) => state.user);

  const open = Boolean(notificationMenu);

  // Connect to 'socket-server'
  useEffect(() => {
    socket?.on("like_post_notification", (info) => {
      console.log("NotificationHome 'like_post_notification' ", info);
      dispatch(add_New_Notification(info));
    });

    socket?.on("post_comment_notification", (info) => {
      // console.log("Like info from server: ", info);
      dispatch(add_New_Notification(info));
    });

    socket?.on('notification_follow_user', (info) => {
      // console.log('Follow notification: ', info)
      dispatch(add_New_Notification(info))
    })
    
    
    socket?.on('notification_Job_Applied', (info) => {
      console.log('Notification info: ', info)
      dispatch(add_New_Notification(info))
    })
  }, []);



  const handle_Remove_Notification = (postId, type) => {
    dispatch(delete_Notification({postId, type}));
  };



  const handle_Follow_Remove_Notification = (user_Id) => {
    dispatch(delete_Follow_Notification({user_Id}))
  }



  const handle_Job_Remove_Notification = (user_Id, job_Id) => {
    dispatch(delete_Job_Notification({user_Id, job_Id}))
  }



  return (
    <div className=" relative">
      {/* <Button
        id="basic-button"
        // aria-controls={open ? "basic-menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        // onClick={handleNotificationClick}
      >
        Dashboard
      </Button> */}
      <Menu
        // sx={{
        //   position: "absolute",
        //   top: "-24rem",
        //   left: "18rem",

        //   "@media (max-width: 1000px)": {
        //     top: "-26.5rem",
        //     left: "35rem",
        //   },
        // }}
        id="basic-menu"
        anchorEl={notificationMenu}
        open={open}
        onClose={handleNotificationClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        hidden={notifications?.length === 0}
      >
        {notifications.map((item, idx) => (
          <div key = {idx}>
            {item.type === "job" && (
              <div
                // style={{ border: "3px solid red" }}
                key={idx}
                className="flex items-center  p-1 "
              >
                <MenuItem
                  // style={{ border: "3px solid green" }}
                  onClick={handleNotificationClose}
                  className="flex items-center"
                >
                  <Link to={`/profile/${item?.logged_In_User?.username}`}>
                    <span className=" text-md font-semibold text-gray-500">
                      {item?.logged_In_User?.username}
                    </span>
                  </Link>
                  &nbsp; &nbsp;{" "}
                  <span className="text-sm font-medium text-gray-400">
                    applied to the
                  </span>
                  &nbsp; &nbsp;{" "}
                  <Link to={`/job/${item?.job_Applied_Id}`}>
                    <span className="text-md font-semiboldtext-gray-700">
                      job
                    </span>
                  </Link>
                  <CloseIcon
                    style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
                    onClick={() =>
                      handle_Job_Remove_Notification(
                        item.logged_In_User.id,
                        item.job_Applied_Id
                      )
                    }
                  />
                </MenuItem>
              </div>
            )}
            {item.type === "follow" && (
              <div
                // style={{ border: "3px solid red" }}
                key={idx}
                className="flex items-center  p-1 "
              >
                <MenuItem
                  // style={{ border: "3px solid green" }}
                  onClick={handleNotificationClose}
                  className="flex items-center"
                >
                  <Link to={`/profile/${item?.logged_In_User?.username}`}>
                    <span className=" text-md font-semibold text-gray-500">
                      {item?.logged_In_User?.username}
                    </span>
                  </Link>
                  &nbsp; &nbsp;{" "}
                  <span className="text-sm font-medium text-gray-400">
                    started following you
                  </span>
                  <CloseIcon
                    style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
                    onClick={() =>
                      handle_Follow_Remove_Notification(
                        item?.logged_In_User?.id
                      )
                    }
                  />
                </MenuItem>
              </div>
            )}
            {(item.type === "like" || item.type === "comment") && (
              <div
                // style={{ border: "3px solid red" }}
                key={idx}
                className="flex items-center  p-1 "
              >
                <MenuItem
                  // style={{ border: "3px solid green" }}
                  onClick={handleNotificationClose}
                  className="flex items-center"
                >
                  <Link to={`/profile/${item?.logged_In_Username}`}>
                    <span className=" text-md font-semibold text-gray-500">
                      {item?.logged_In_Username}
                    </span>
                  </Link>
                  &nbsp; &nbsp;{" "}
                  <span className="text-sm font-medium text-gray-400">
                    {item?.type === "like" && "liked your"}
                    {item?.type === "comment" && "commented on your"}
                  </span>{" "}
                  &nbsp; &nbsp;
                  <Link to={`/post/${item?.post_Id}`}>
                    <span className="text-md font-semiboldtext-gray-700">
                      post
                    </span>
                  </Link>
                  <CloseIcon
                    style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
                    onClick={() =>
                      handle_Remove_Notification(item.post_Id, item.type)
                    }
                  />
                </MenuItem>
              </div>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
}