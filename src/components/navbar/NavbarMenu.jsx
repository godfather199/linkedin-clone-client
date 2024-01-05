import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initial_User_State, thunk_Logout_User } from '../../store/slices/userSlice';
import { post_Remaining_Initial_State, post_initial_state } from '../../store/slices/postSlice';


export default function NavbarMenu({anchorEl, setAnchorEl}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {currentUser, isSuccess} = useSelector(state => state.user)
  
  const open = Boolean(anchorEl);

  const [isLogout, setIsLogout] = useState(false)
  

  // Reset the redux store
  useEffect(() => {
    if(isSuccess && isLogout) {
      // console.log('Inside navbar menu')
      setIsLogout(false)
      dispatch(initial_User_State())
      dispatch(post_initial_state())
      dispatch(post_Remaining_Initial_State())
      navigate('/')
    }
  }, [isSuccess])


  
  const handleClose = () => {
    // console.log('handleClose() ran')
    setAnchorEl(null);
  };


  const handle_User_Logout = () => {
    setIsLogout(true)
    dispatch(thunk_Logout_User())
    handleClose()
  }



  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem className="w-[15rem] h-[3rem]" onClick={handleClose}>
          Profile Picture
        </MenuItem> */}
        <Link to={`/profile/${currentUser?.username}`}>
          <MenuItem className="w-[15rem] h-[3rem]" onClick={handleClose}>
            View Profile
          </MenuItem>
        </Link>
        <Link to={`/all-posts/${currentUser?.username}`}>
          <MenuItem className="w-[15rem] h-[3rem]" onClick={handleClose}>
            Posts
          </MenuItem>
        </Link>
        <Link to={`/saved-posts`}>
          <MenuItem className="w-[15rem] h-[3rem]" onClick={handleClose}>
            Saved Posts
          </MenuItem>
        </Link>
        <MenuItem className="w-[15rem] h-[3rem]" onClick={handle_User_Logout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
