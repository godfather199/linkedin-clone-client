import {Messages} from '../'
import { useDispatch, useSelector } from "react-redux"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { socket } from "../../App";
import { thunk_New_Message } from "../../store/thunks/chatThunk";
import { add_New_Message, reset_New_Message } from "../../store/slices/chatSlice";
import { CircularProgress } from '@mui/material';



function ChatBox() {
  const dispatch = useDispatch()


  const {
    currentChat,
    chatInfo,
    newMessageSuccess,
    new_Message_Info,
    newMessageLoading  
  } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);

  

  const [newMessage, setNewMessage] = useState('')
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)



  // Socket operations
  useEffect(() => {
    socket?.on('receive_New_Message', (info) => {
      dispatch(add_New_Message(info?.new_Message_Info))
    })

    socket?.on("typing", () => setIsTyping(true))

    socket?.on('stop typing', () => setIsTyping(false))
  }, [])
  



  // Message send successfully
  useEffect(() => {
    if (newMessageSuccess) {
      socket?.emit("send_New_Message", {
        new_Message_Info,
        receiver: chatInfo.users[0]._id,
      });
      dispatch(reset_New_Message());
    }
  }, [newMessageSuccess]);



  const handle_Send_Message = () => {
    if(newMessage.trim().length === 0) {
        return toast.error('Message is required', {
            duration: 1500,
            position: 'bottom-center'
        })
    }

    dispatch(thunk_New_Message({
      content: newMessage,
      chatId: chatInfo._id
    }))

    setNewMessage('')
  }



  const handle_Typing_Message = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket?.emit("typing", {
        receiver: chatInfo.users[0]._id
      });
    }

    let lastTypingTime = new Date().getTime();
    
    var timerLength = 3000;
    
    setTimeout(() => {
      var timeNow = new Date().getTime();
      
      var timeDiff = timeNow - lastTypingTime;
      
      if (timeDiff >= timerLength && typing) {
        socket?.emit("stop typing", {
          receiver: chatInfo.users[0]._id
        });
        setTyping(false);
      }
    }, timerLength);
  };
  
  
  return (
    <div
      // style={{ border: "3px solid purple" }}
      className="h-[37rem] flex flex-col justify-between p-2"
    >
      {/* Friend Info */}
      <div
        // style={{ border: "4px solid orange" }}
        className="flex items-center gap-7 "
      >
        {chatInfo?.users[0]?.avatar?.url ? (
          <img
            src={chatInfo?.users[0]?.avatar?.url}
            alt=""
            className="border-2 border-blue-600 w-[3rem] h-[3rem] object-cover rounded-full"
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "3rem" }} />
        )}
        <span className=" text-xl tracking-tight font-semibold text-gray-500">
          {chatInfo?.users[0]?.name}
        </span>
      </div>

      {/* Chat messages */}
      <div className="">
        {currentChat?.length === 0 ? (
          <div
            // style={{ border: "3px solid red" }}
            className="flex flex-col items-center gap-3 font-serif text-2xl  text-gray-400"
          >
            <span className="">No messages yet</span>
            <span className="">Send a message to your friend</span>
          </div>
        ) : (
          <Messages isTyping={isTyping} />
        )}
      </div>

      {/* Send message box */}
      <div
        // style={{ border: "3px solid red" }}
        className="  flex items-center justify-between p-2 "
      >
        {/* Logged in user image */}
        <div className="min-w-[2.5rem] min-h-[2.5rem]">
          {currentUser?.avatar?.url ? (
            <img
              src={currentUser?.avatar?.url}
              alt=""
              className="border-2 border-blue-600  w-[2.5rem] h-[2.5rem] object-cover rounded-full"
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "3rem" }} />
          )}
        </div>

        {/* Input box */}
        <div className="w-[100%] ml-5">
          <input
            // style={{border: '3px solid green'}}
            type="text"
            className="border-2 border-gray-400 w-[95%] h-[3rem] outline-none p-3 rounded-[2rem] text-md font-medium text-gray-400"
            value={newMessage}
            onChange={handle_Typing_Message}
          />
        </div>

        {/* Send button */}
        <div className="">
          <button
            onClick={handle_Send_Message}
            className={`w-[6.8rem] h-[2.7rem]  rounded-[2rem] text-white text-xl font-semibold ${
              newMessageLoading ? " cursor-not-allowed" : " cursor-pointer"
            } ${newMessageLoading ? "bg-blue-400" : "bg-blue-600"}`}
            disabled={newMessageLoading}
          >
            {newMessageLoading ? (
              <CircularProgress size="1.3rem" style={{ color: "white" }} />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox