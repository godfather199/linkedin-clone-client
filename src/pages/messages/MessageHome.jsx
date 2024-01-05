import {ChatSidebarModal, ChatBox, ChatSidebar} from '../'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reset_Current_Chat } from '../../store/slices/chatSlice';




function MessageHome() {
 const dispatch = useDispatch()
 

 const [isChatSelected, setIsChatSelected] = useState(false)
 const [open, setOpen] = useState(false);


 useEffect(() => {
  dispatch(reset_Current_Chat())
  setIsChatSelected(false) 
 }, [])


  return (
    <div
      // style={{ border: "3px solid green" }}
      className=" h-[37rem] flex flex-col lg:flex-row lg:gap-5 p-3"
    >
      {/* Sidebar */}
      {/* Sidebar after 768px */}
      <div className="hidden lg:block">
        <ChatSidebar setIsChatSelected={setIsChatSelected} />
      </div>

        {/* Sidebar till 768px */}
      <div className="lg:hidden">
        <ChatSidebarModal open={open} setOpen={setOpen}>
          <ChatSidebar open = {open} setIsChatSelected={setIsChatSelected} />
        </ChatSidebarModal>
      </div>

      {/* Chat Box  */}
      <div className="w-full">
        {isChatSelected ? (
          <ChatBox />
        ) : (
          <div
            // style={{ border: "3px solid purple" }}
            className="h-[28rem] flex items-center justify-center"
          >
            <span className=" font-serif text-2xl  text-gray-400">
              Click to start chatting with your friends
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageHome