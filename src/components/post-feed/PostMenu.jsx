import {CreatePostModal, PostDeleteModal} from '../'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useImage from '../../hooks/useImage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { thunk_Featured_Post } from '../../store/slices/postSlice';
import { initial_User_State, thunk_Fetch_Saved_Posts, thunk_Remove_Saved_Post, thunk_Save_Post } from '../../store/slices/userSlice';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { logged_In_User_Info_Service } from '../../services/userService';




export default function PostMenu({anchorEl, setAnchorEl, post}) {
  const dispatch = useDispatch()
  const {username} = useParams()
  const {pathname} = useLocation()

  const {imageData} = useImage(post?.postImage?.url)

  const {currentUser, isSuccess} = useSelector(state => state.user)

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)
  const [postImage, setPostImage] = useState(imageData)
  const [postPreview, setPostPreview] = useState(imageData)
  const [textContent, setTextContent] = useState('')
  const [loggedInUserPosts, setLoggedInUserPosts] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPostFeatured, setIsPostFeatured] = useState(false)
  const [isPostSaved, setIsPostSaved] = useState(false)
  const [removeSavePostCheck, setRemoveSavePostCheck] = useState(false)

  // console.log('Post: ', post)


  // Check if post is featured
  useEffect(() => {
    setIsPostFeatured(post?.featured)
  }, [post?.featured])



  // Check if post is saved
  useEffect(() => {
    setIsPostSaved(currentUser?.saved?.includes(post?._id))
  }, [currentUser])


  // Update posts after removing saved post
  useEffect(() => {
    if(isSuccess && removeSavePostCheck) {
      dispatch(thunk_Fetch_Saved_Posts())
      dispatch(initial_User_State())
    }
  }, [isSuccess])



  // Post saved/unsaved successfully
  // useEffect(() => {
  //   if(isSuccess) {
  //     dispatch(logged_In_User_Info_Service())
  //     dispatch(initial_User_State())
  //   }
  // }, [isSuccess])



  const handle_Toggle_Featured_Post = () => {
    handleClose()
    dispatch(thunk_Featured_Post(post?._id))
  }


  

  const handle_Open_Delete_Modal = (e) => {
    // e.stopPropagation()
    handleClose()
    setOpenDeleteModal(true)
  }
  
  
  const handle_Close_Delete_Modal = () => setOpenDeleteModal(false);


  // Check for logged-In user posts
  useEffect(() => {
    setLoggedInUserPosts(username === currentUser?.username)
  }, [username])


  // Open post modal
  const handleOpen = () => {
    setTextContent(post?.caption)
    setPostImage(imageData);
    setPostPreview(imageData);
    setOpenCreatePostModal(true)
  }
  
  
  // Close post modal
  const handleCloseModal = () => {
    setOpenCreatePostModal(false)
  }

  const open = Boolean(anchorEl);

  const handleClose = (info) => {
    if(info === 'edit') {
      handleOpen()
    }
    setAnchorEl(null);
  };



  const handleUploadImage = (e) => {
    const reader = new FileReader();

    setPostImage("");
    setPostPreview("");

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log('This function ran')
        setPostImage(reader.result);
        setPostPreview(reader.result);
        // handleOpen();
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }; 



  const handle_Save_Post = (info) => {
    dispatch(thunk_Save_Post(info))
    handleClose()
  }



  const handle_Remove_Saved_Post = (info) => {
    dispatch(thunk_Remove_Saved_Post(info))
    setRemoveSavePostCheck(true)
    handleClose()
  }


  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // anchorOrigin={{
        //   vertical: "left",
        //   horizontal: "right",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "right",
        // }}
      >
        {isPostSaved ? (
          <MenuItem
            className="w-[18rem] h-[3rem] flex gap-3"
            onClick={() => handle_Remove_Saved_Post(post?._id)}
          >
            <BookmarkIcon />
            Unsave
          </MenuItem>
        ) : (
          <MenuItem
            className="w-[18rem] h-[3rem] flex gap-3"
            onClick={() => handle_Save_Post(post?._id)}
          >
            <BookmarkBorderIcon />
            Save
          </MenuItem>
        )}
        {loggedInUserPosts && (
          <div>
            <MenuItem
              className="w-[18rem] h-[3rem] flex gap-3"
              onClick={handle_Toggle_Featured_Post}
            >
              {isPostFeatured ? (                    
                <>
                  <StarIcon />
                  Remove from featured
                </>
              ) : (
                <>
                  <StarBorderIcon />
                  Feature on top of profile
                </>
              )}
            </MenuItem>

            <MenuItem
              onClick={() => handleClose("edit")}   
              className="w-[18rem] h-[3rem] flex gap-3"
            >
              <EditIcon /> Edit Post
            </MenuItem>
            <MenuItem
              onClick={(e) => handle_Open_Delete_Modal(e)}
              className="w-[18rem] h-[3rem] flex gap-3"
            >
              <DeleteIcon />
              Delete Post
            </MenuItem>
          </div>
        )}
      </Menu>
      <CreatePostModal
        openCreatePostModal={openCreatePostModal}
        handleClose={handleCloseModal}
        postImage={postImage}
        postPreview={postPreview}
        handleUploadImage={handleUploadImage}
        textContent={textContent}
        setTextContent={setTextContent}
        editState={true}
        postId={post?._id}
      />
      <PostDeleteModal                       
        openDeleteModal={openDeleteModal}
        handle_Close_Delete_Modal={handle_Close_Delete_Modal}
        postId={post?._id}
      />
    </div>
  );
}
