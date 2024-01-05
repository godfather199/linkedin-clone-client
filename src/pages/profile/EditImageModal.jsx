import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';


const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 450,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function EditImageModal({
  openEditImageModal,
  setOpenEditImageModal,
  avatarImage,
  setAvatarImage,
  handle_Avatar_Edit_Image,
  showUpdateBtn,
  setShowUpdateBtn,
  userDetails,
  handle_Avatar_Image_Update,
  isLoading
}) {
  // console.log('Avatar Image: ', avatarImage)
  const dispatch = useDispatch()


  const handleClose = () => {
    // setAvatarImage('')
    setShowUpdateBtn(false)
    setOpenEditImageModal(false)
  } 


  


  return (
    <div>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          //  open={open}
          //  onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Modal
          open={openEditImageModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style} className="bg-gray-800 rounded-lg outline-none ">
            <div className="">
              <span className="text-white">Profile photo</span>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "white", cursor: "pointer" }}
              />
            </div>
            <div className="">
              {userDetails?.avatar?.url || avatarImage !== "" ? (
                <img
                  src={avatarImage}
                  alt=""
                  className="h-[15rem] w-[15rem] rounded-full object-cover"
                />
              ) : (
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg"
                  alt=""
                  className="h-[15rem] w-[15rem] rounded-full object-cover"
                />
              )}
            </div>
            <div className="text-white ">
              <div className="">
                <label className="cursor-pointer flex flex-col">
                  <PhotoCameraIcon />
                  Add Photo{" "}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handle_Avatar_Edit_Image}
                  />
                </label>
              </div>
              <div className="">
                {showUpdateBtn && (
                  <button
                    className="text-white"
                    onClick={handle_Avatar_Image_Update}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
