import {PostMenu, Comment} from '../'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { like_Post_Real_Time, post_initial_state, thunk_Like_Unlike_Post, thunk_Posts_Of_Following } from '../../store/slices/postSlice';
import { useEffect, useRef, useState } from 'react';
import useTime from '../../hooks/useTime';
import { initial_User_State, thunk_Follow_Unfollow } from '../../store/slices/userSlice';
import { socket } from '../../App';

// TLF => Testing like functionality



function Post({post}) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log('Post: ', post)
  const { timeAgo } = useTime(post?.createdAt);
  

  // const {isSuccess} = useSelector(state => state.post)
  const { currentUser, isSuccess } = useSelector((state) => state.user);


  const [isLikedPost, setIsLikedPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);




  // Check follow/unfollow status
  useEffect(() => {
    setIsFollowing(currentUser?.following?.includes(post?.postedBy?._id));
  }, [currentUser]);

  useEffect(() => {
    if (isSuccess && pathname.split("/")[1] !== "all-posts") {
      dispatch(thunk_Posts_Of_Following());
    }
    dispatch(initial_User_State());
  }, [isSuccess]);

  // Post like status
  useEffect(() => {
    // console.log('useEffect ran')
    setIsLikedPost(post?.likes?.some((item) => item === currentUser?._id));
    // setIsLikedPost(post?.likes?.includes(currentUser._id))
    
    
  }, [post?.likes]);


  // Like post realtime
  useEffect(() => {
    socket?.on('server_like_post_realtime', (info) => {
      console.log('server_like_post_realtime ran')
      // console.log("Real time Like info from server: ", info);
      // dispatch(add_New_Notification(info));
      dispatch(like_Post_Real_Time(info))
    });
  }, []);
  
  
  
  // Post like status --> socket server
  // useEffect(() => {
  //   console.log('Socket ran')
  //   // TLF
  //   socket?.emit('like_post', {
  //     logged_In_User: currentUser._id,
  //     post_Author: post?.postedBy?._id,
  //     post_Id: post?._id,
  //     post_Status: isLikedPost
  //   })

  // }, [isLikedPost])

  

  // Handle like-unlike post
  const handle_Like_Unlike_Post = () => {
    dispatch(thunk_Like_Unlike_Post(post._id));

    socket?.emit("client_like_post_realtime", {
      liked_By_User: currentUser?._id,
      post_Author: post?.postedBy?._id,
      post_Id: post?._id,
      post_Status: !isLikedPost,
    });

    if(!isLikedPost && currentUser?._id !== post?.postedBy?._id) {
      // TLF
      socket?.emit("like_post", {
        type: 'like',
        logged_In_User: currentUser?._id,
        logged_In_Username: currentUser?.username,
        post_Author: post?.postedBy?._id,
        post_Id: post?._id,
        post_Status: !isLikedPost,
      });
    }

  };

  // Open post menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handle_Toggle_Comment_Box = (e) => {
    e.stopPropagation();
    setShowCommentBox(!showCommentBox);
  };

  const handle_Toggle_Follow = () => {
    dispatch(thunk_Follow_Unfollow(post?.postedBy?._id));
  };

  return (
    <div className="my-5 p-4 border border-gray-400 bg-white rounded-lg shadow-lg">
      {/* Top Section */}
      <div
        // style={{ border: "3px solid green" }}
        className="flex items-center justify-between mb-5"
      >
        {/* Post User info */}
        <div className="flex gap-3">
          <div className="">
            {post?.postedBy?.avatar?.url ? (
              <img
                src={post?.postedBy?.avatar?.url}
                alt=""
                className="h-[2.5rem] w-[2.5rem] rounded-full object-cover shadow-lg border border-black"
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: "3rem" }} />
            )}
          </div>
          <div className="">
            <div className="flex items-center gap-[4rem]">
              <Link to={`/profile/${post?.postedBy?.username}`}>
                <span className="">{post?.postedBy?.name}</span>
              </Link>
              <span
                onClick={handle_Toggle_Follow}
                className={`text-sm font-semibold text-blue-600 cursor-pointer ${
                  post?.postedBy?._id === currentUser?._id ? "hidden" : "block"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Engineer @Google | Quora | Not from IIT, NIT, IIIT or IIM
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <MoreHorizOutlinedIcon onClick={handleMenuClick} />
          <PostMenu post={post} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
      </div>

      {/* Post content Section */}
      <div className="">
        <span className=" text-sm font-medium text-gray-500">
          {post?.caption}
        </span>
        {post?.postImage?.url && (
          <img
            src={post?.postImage?.url}
            alt=""
            className="h-[18rem] w-full object-cover my-5"
          />
        )}
      </div>

      {/* Bottom Section */}
      <div className="">
        <div className="mb-3">
          <span className=" text-sm text-red-600 ">{timeAgo}</span>
        </div>
        <div className="flex gap-3">
          <div className="flex w-[3rem]">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
              alt="like"
              className="-mr-2"
            />
            <img
              src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22"
              alt="love"
              className="-mr-2"
            />
            <img
              src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
              alt="celebrate"
            />
          </div>
          <span className="text-sm text-blue-700 font-semibold ">
            {post?.likes?.length} likes
          </span>
          <span className="text-sm text-blue-700 font-semibold ">
            {post?.comments?.length} comments
          </span>
        </div>
        <div
          onClick={handle_Like_Unlike_Post}
          className=" flex items-center gap-2 mt-4"
        >
          {isLikedPost ? (
            <ThumbUpIcon style={{ color: "blue", cursor: "pointer" }} />
          ) : (
            <ThumbUpOutlinedIcon style={{ color: "blue", cursor: "pointer" }} />
          )}
          <ChatBubbleOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={handle_Toggle_Comment_Box}
          />
        </div>
        {showCommentBox && (
          <Comment
            commentInfo={post?.comments}
            postId={post?._id}
            postAuthorId={post?.postedBy?._id}
          />
        )}
      </div>
    </div>
  );
}

export default Post