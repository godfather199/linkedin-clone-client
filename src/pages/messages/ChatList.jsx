import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunk_Fetch_All_Chats, thunk_Fetch_All_Messages } from "../../store/thunks/chatThunk"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




function ChatList({handle_Fetch_Messages}) {
  const dispatch = useDispatch()


  const {chats} = useSelector(state => state.chat)
  const {currentUser} = useSelector(state => state.user)

  const [filteredChat, setFilteredChat] = useState([])
  const [hoveredChat, setHoveredChat] = useState('')
  const [highlightedChat, setHighlightedChat] = useState('')


// console.log('Hovered chat: ', hoveredChat)

  //Fetch all chats
  useEffect(() => {
    dispatch(thunk_Fetch_All_Chats())
  }, [])



 //Chat user list
 useEffect(() => {
  const filter = chats.map((chatItem) => {
    return {
      ...chatItem,
      users: chatItem.users.filter(item => item._id !== currentUser._id)
    }
  })

  setFilteredChat(filter)
 }, [chats])



  return (
    <div className="">
      {filteredChat?.map((item) => (
        <div
          // style={{border: '3px solid red'}}
          key={item?._id}
          className={`flex items-center gap-4 mb-4 cursor-pointer ${
            hoveredChat === item?._id ? " hover:bg-gray-100" : null
          } ${
            highlightedChat === item?._id ? "bg-gray-300" : null
          } p-2 rounded-lg`}
          onClick={() => {
            setHighlightedChat(item?._id);
            setHoveredChat("");
            handle_Fetch_Messages(item);
          }}
          onMouseEnter={() => setHoveredChat(item?._id)}
          onMouseLeave={() => setHoveredChat("")}
        >
          {item?.users[0]?.avatar?.url ? (
            <img
              src={item?.users[0]?.avatar?.url}
              alt=""
              className="w-[2rem] h-[2rem] object-cover rounded-full"
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "2.7rem" }} />
          )}
          <span className="">{item?.users[0]?.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatList