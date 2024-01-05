import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 400,
//   bgcolor: 'background.paper',
  border: '4px solid white',
  boxShadow: 24,
  // p: 8,
};

export default function ChatSidebarModal({open, setOpen, children}) {
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        // style={{ border: "3px solid red" }}
        className="h-[4rem] flex items-center justify-center "
      >
        <button
          className="w-[15rem] text-xl font-mono tracking-tighter text-white bg-blue-600 p-2 rounded-[0.5rem] shadow-lg"
          onClick={handleOpen}
        >
          Search users to chat
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white p-5">
          {children}
        </div>
      </Modal>
    </div>
  );
}
