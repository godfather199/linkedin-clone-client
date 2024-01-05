import {CreatePostModal} from '../'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useState } from "react";
import { useSelector } from 'react-redux';



function CreatePost() {
  const {currentUser} = useSelector(state => state.user)

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)
  const [postImage, setPostImage] = useState('')
  const [postPreview, setPostPreview] = useState('')
  const [textContent, setTextContent] = useState('')


  // Open post modal
  const handleOpen = () => {
    setOpenCreatePostModal(true)
  }
  
  
  // Close post modal
  const handleClose = () => {
    setOpenCreatePostModal(false)
  }


  // Upload post image
  const handleUploadImage = (e) => {
    const reader = new FileReader()

    setPostImage('')
    setPostPreview('')

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log('This function ran')
        setPostImage(reader.result);
        setPostPreview(reader.result);
        handleOpen()
      }
    };

    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  } 



  return (
    <>
      <div className="border border-gray-400 p-3  bg-white rounded-lg shadow-lg ">
        <div
          // style={{ border: "3px solid green" }}
          className="flex items-center gap-6 p-5"
        >
          {currentUser?.avatar?.url ? (
            <img
              src={currentUser?.avatar?.url}
              alt=""
              className="h-[2.8rem] sm:h-[3rem] w-[2.8rem] sm:w-[3rem] rounded-full object-cover shadow-lg border-2 border-blue-600 "
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "3rem" }} />
          )}
          {/* <AccountCircleIcon style={{ fontSize: "3rem" }} /> */}
          <span
            onClick={handleOpen}
            className="border border-gray-600 w-[18rem] sm:w-[21rem] lg:w-[27rem] rounded-[25px] p-4 text-sm text-gray-400 font-semibold cursor-pointer hover:bg-gray-200"
          >
            Start a post
          </span>
        </div>
        <div
          // style={{ border: "3px solid purple" }}
          className=" flex items-center gap-2 ml-4 mt-2"
        >
          <label className="cursor-pointer flex items-center">
            <PermMediaIcon style={{ fontSize: "1.5rem", color: "blue" }} />
            <span className="text-sm text-gray-500 font-bold ml-2">Media</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
      </div>
      <CreatePostModal
        openCreatePostModal={openCreatePostModal}
        handleClose={handleClose}
        postPreview={postPreview}
        handleUploadImage={handleUploadImage}
        postImage={postImage}
        textContent={textContent}
        setTextContent={setTextContent}
      />
    </>
  );
}

export default CreatePost;
