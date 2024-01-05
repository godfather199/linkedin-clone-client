import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloseIcon from '@mui/icons-material/Close';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useDispatch, useSelector } from 'react-redux';
import { post_initial_state, thunkCreatePost, thunk_Update_Post } from '../../store/slices/postSlice';
import { Backdrop, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import AccountCircle from '@mui/icons-material/AccountCircle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 580,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function CreatePostModal({
  openCreatePostModal,
  postPreview,
  handleClose,
  handleUploadImage,
  postImage,
  textContent,
  setTextContent,
  editState,
  postId
}) {
  const dispatch = useDispatch()
  const {isSuccess, isLoading} = useSelector(state => state.post)
  const {currentUser} = useSelector(state => state.user)

  // console.log('PostId: ', postId)


  // Handle post
  const handlePost = () => {
    dispatch(
      thunkCreatePost({ caption: textContent, current_Post_Pic: postImage })
    );
    setTextContent('')
  }


  const handleEditPost = () => {
    dispatch(
      thunk_Update_Post(
        { caption: textContent, current_Post_Pic: postImage, postId }
      )
    );
  }



  useEffect(() => {
    if(isSuccess) {
      // console.log('Inside CreatePostModal')
      dispatch(post_initial_state())
    }

    setTimeout(() => {
      handleClose();
    }, 1800);
  }, [isSuccess]);


  return (
    <div>
      <Modal
        open={openCreatePostModal}
        // open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{opacity: '0.7'}}
      >
        <div
          style={style}
          className=" bg-white rounded-[12px] outline-none p-3"
        >
          {/* Top section  */}
          <div
            // style={{ border: "3px solid red" }}
            className="flex items-center justify-between mb-3 p-3"
          >
            <div
              // style={{ border: "3px solid purple" }}
              className=" flex items-center gap-3 hover:bg-gray-200 transition ease-in-out duration-100 p-2.5 rounded-xl cursor-pointer"
            >
              {currentUser?.avatar?.url ? (
                <img
                  src={currentUser?.avatar?.url}
                  alt=""
                  className="h-[3.5rem] w-[3.5rem] rounded-full object-cover shadow-lg border border-black"
                />
              ) : (
                <AccountCircle style={{ fontSize: "3rem" }} />
              )}
              <span className="text-xl font-medium text-gray-700">
                {currentUser?.name}
              </span>
            </div>
            <div className="" onClick={handleClose}>
              <CloseIcon style={{ color: "gray", fontSize: "2rem" }} />
            </div>
          </div>

          {/* Middle section */}
          <div
            // style={{ border: "3px solid purple" }}
            className=" h-[20rem] overflow-y-auto"
          >
            {/* {isLoading && ( */}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              //  open={open}
              //  onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {/* // )} */}
            <textarea
              style={{
                // border: "3px solid black",
                resize: "none",
                // height: "10rem",
                minHeight: "10rem",
                // overflowY: "none",
                outline: "none",
                // maxHeight: "20rem",
                // scrollbarWidth: "none",
              }}
              placeholder="What do you want to talk about?"
              cols={85}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              autoFocus = {true}
            />
            {postPreview && (
              <img
                src={postPreview}
                alt=""
                className=" h-[20rem] w-full object-cover "
              />
            )}
          </div>

          {/* Bottom section */}
          <div className="my-3">
            <label className="cursor-pointer">
              <PermMediaIcon style={{ fontSize: "2rem", color: "gray" }} />
              {/* <span className="text-sm text-gray-500 font-bold">Media</span> */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
            </label>
          </div>
          <div className="border border-gray-300 my-4 " />
          <div
            // style={{ border: "3px solid red" }}
            className="flex items-center justify-end mr-4"
          >
            <button
              onClick={editState ? handleEditPost : handlePost}
              disabled={isLoading}
              className={`${
                textContent
                  ? "bg-blue-600 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }  w-[4.5rem] p-1.5 font-semibold text-md rounded-[2rem]`}
            >
              {editState ? "Edit" : "Post"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
