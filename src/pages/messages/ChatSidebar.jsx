import {SearchBar} from '../../components'
import {ChatList} from '../'
import { useDispatch } from 'react-redux'
import { thunk_Fetch_All_Messages } from '../../store/thunks/chatThunk'
import { selected_Chat_Info } from '../../store/slices/chatSlice'


function ChatSidebar({open, setIsChatSelected}) {
  const dispatch = useDispatch()



  const handle_Fetch_Messages = (info) => {
    // console.log('Info: ', info)
    dispatch(selected_Chat_Info(info))
    dispatch(thunk_Fetch_All_Messages(info?._id))
    setIsChatSelected(true)
 }

  return (
    <div className="relative">
      {/* Search bar */}
      <div className= {`border-2 border-gray-300 rounded-[0.6rem]  ${open ? "w-[18.4rem]" : null} z-10`}>
        <SearchBar />
      </div>

      {/* User Chats */}
      <div
        // style={{ border: "4px solid purple" }}
        className=" border border-gray-300 w-[18.7rem] absolute top-[4.5rem] p-3 rounded-[1rem] shadow-lg"
      >
        <ChatList handle_Fetch_Messages={handle_Fetch_Messages} />
      </div>
    </div>
  );
}

export default ChatSidebar