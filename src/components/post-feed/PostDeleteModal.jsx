import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk_Delete_Post } from '../../store/slices/postSlice';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  height: 180,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function PostDeleteModal({
  openDeleteModal,
  handle_Close_Delete_Modal,
  postId
}) {
  const dispatch = useDispatch()


  const handle_Delete_Post = (e) => {
    e.stopPropagation()
    dispatch(thunk_Delete_Post(postId))
  }


  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handle_Close_Delete_Modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white rounded-lg">
          <div className="">
            <div className="p-3">
              <span className="flex items-center justify-center text-lg text-gray-700">
                Delete Post?
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="w-[18rem] text-md text-gray-500">
                Are you sure you want to permanently remove this post from
                LinkedIn?
              </span>
            </div>
            <div className="border border-gray-100 my-3" />
            <div className="flex items-center justify-end gap-3 mt-1">
              <button
                onClick={handle_Close_Delete_Modal}
                className="border border-gray-800 w-[6rem] h-[2.5rem] text-lg font-semibold text-gray-500 rounded-[18px] tracking-wide"
              >
                Cancel
              </button>
              <button
                onClick={(e) => handle_Delete_Post(e)}
                className=" w-[6rem] h-[2.5rem] text-lg font-semibold text-white bg-blue-700 rounded-[18px] tracking-wide mr-5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
