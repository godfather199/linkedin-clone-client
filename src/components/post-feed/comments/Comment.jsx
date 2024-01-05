import { useDispatch, useSelector } from "react-redux"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { thunk_Add_Comment } from "../../../store/slices/postSlice";
import { socket } from "../../../App";



function Comment({commentInfo, postId, postAuthorId}) {
  const dispatch = useDispatch()


  // console.log('Comment: ', commentInfo)
  
  const {currentUser} = useSelector(state => state.user)
  const {commentLoading} = useSelector(state => state.post)


  const [commentText, setCommentText] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)


  
  // Check follow/unfollow status 
  useEffect(() => {
    setIsFollowing(currentUser?.following?.includes(postAuthorId))
  }, [currentUser])



  const handle_Submit_Comment = () => {
    dispatch(thunk_Add_Comment({comment: commentText, postId}))

    if(currentUser?._id !== postAuthorId) {
      socket?.emit('post_comment', {
        type: 'comment',
        logged_In_User: currentUser?._id,
        logged_In_Username: currentUser?.username,
        post_Author: postAuthorId,
        post_Id: postId
      })
    }

    setCommentText('')
  }



  return (
    <div className="mt-4">
      {/* Add Comment */}
      <div
        // style={{ border: "3px solid green" }}
        className="flex items-center gap-2 lg:gap-4 h-[4rem] mb-[2rem]"
      >
        <div className="w-[2.2rem] h-[2.2rem]">
          <img
            src={currentUser?.avatar.url}
            alt=""
            className="border-2 border-blue-600 w-[2.2rem] h-[2.2rem] object-cover rounded-full"
          />
        </div>
        {isFollowing || (currentUser?._id === postAuthorId) ? (
          <>
            <div className="">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="border-2 border-gray-400 w-[16rem] lg:w-[23rem] text-sm text-gray-600 p-2.5  outline-none rounded-[2rem]"
              />
            </div>
            <div className="">
              <button
                disabled={commentLoading || !commentText}
                onClick={handle_Submit_Comment}
                className={`${
                  commentLoading || !commentText
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } bg-blue-600 text-white text-sm font-semibold w-[6rem] h-[2.3rem]    rounded-[2.2rem] `}
              >
                {commentLoading ? (
                  <CircularProgress size="1.2rem" style={{ color: "white" }} />
                ) : (
                  "Comment"
                )}
              </button>
            </div>
          </>
        ) : (
          <span className="ml-10 text-lg font-light text-gray-600 tracking-wider bg-gray-100 p-2">Follow User To Comment.......</span>
        )}
      </div>

      {/* Display all comments */}
      <div className="">
        {commentInfo.map((item) => (
          <div
            // style={{ border: "3px solid purple" }}
            key={item._id}
            className="flex items-center gap-10 my-4"
          >
            {currentUser?.avatar?.url ? (
              <img
                src={currentUser?.avatar?.url}
                alt=""
                className="w-[2rem] h-[2rem] object-cover rounded-full border-2 border-blue-600"
              />
            ) : (
              <AccountCircleIcon />
            )}
            <span className="text-gray-600  text-sm bg-gray-100 p-2">
              {item.comment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment