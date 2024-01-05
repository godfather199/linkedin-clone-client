import {SearchedUserList} from '../'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search_Bar_Service } from '../../services/userService';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { thunk_Search_Chat } from '../../store/thunks/chatThunk';



function SearchBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {currentUser} = useSelector(state => state.user)
  // console.log('Current User: ', currentUser)



  const [searchText, setSearchText] = useState('')
  const [searchedUser, setSearchedUser] = useState([])

  // console.log('Search: ', searchText)
  // console.log('Users: ', searchedUser)

  useEffect(() => {
    // console.log('useEffect ran')
    // if(searchText === '') {
    //   return 
    // }

    const fetchUser = async () => {
        const {users} = await search_Bar_Service(searchText)
        setSearchedUser(users)
    }

    if(searchText.trim().length > 0) {
      fetchUser()
    }

    return () => {
      // console.log('Clean up function ran')
       setSearchedUser([])
    }

  }, [searchText])



  const handle_Navigate_To_User_Profile = (userInfo) => {
    setSearchedUser([])
    setSearchText('')
    navigate(`/profile/${userInfo}`)
  }



  const add_User_To_Chat = (info) => {
    if (currentUser?._id === info._id) {
      return toast.error("You cannot chat with yourself", {
        duration: 1200,
        position: "bottom-center",
      });
    }

    setSearchedUser([])
    setSearchText('')

    if(currentUser?.following.find(item => item === info._id)) {
      dispatch(thunk_Search_Chat(info._id))
    }
    else {
      toast.error('You can only chat with followed users', {
        duration: 1500,
        position: 'bottom-center'
      })
    }

  }



  const handle_Search_Clear = () => {
    setSearchText('')
  }
  

  return (
    <div className="">
      {/* Search input */}
      <div
        // style={{ border: "3px solid green" }}
        className="w-[15rem] md:w-[18rem] p-3 flex items-center gap-2 bg-white rounded-[8px]"
      >
        <SearchIcon style={{ fontSize: "1.3rem" }} />
        <input
          autoFocus
          type="text"
          value={searchText}
          className="bg-white outline-none"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CloseIcon
          // style={{
          //   fontSize: '1.3rem',
          //   marginLeft: "1.6rem",
          //   cursor: "pointer",
          // }}
          onClick={handle_Search_Clear}
          sx={{
            fontSize: "1.3rem",
            marginLeft: "-1.3rem",
            "@media (min-width: 770px)": {
              marginLeft: "1.6rem", // Adjust the margin for small screens
            },
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Display users */}
      <div className="">
        {searchedUser?.length > 0 && (
          <SearchedUserList
            searchedUser={searchedUser}
            handle_Navigate_To_User_Profile={handle_Navigate_To_User_Profile}
            add_User_To_Chat = {add_User_To_Chat}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar