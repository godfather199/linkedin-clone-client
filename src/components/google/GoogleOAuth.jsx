import GoogleIcon from '@mui/icons-material/Google';
import { backend_URL } from '../../App';
import { useState } from 'react';
import useWindowStatus from '../../hooks/useWindowStatus';
import { useDispatch } from 'react-redux';
import { set_Application_Entry_Type } from '../../store/slices/userSlice';



function GoogleOAuth({type}) {
  const dispatch = useDispatch()


  // const {handleGoogleRegistration} = useWindowStatus()
  // const [isSuccess, setIsSuccess] = useState(false)


  const handle_Google_OAuth2 =  () => {
     dispatch(set_Application_Entry_Type(type))
        
     window.open(`${backend_URL}/auth/google/callback`, "_self");
    //  setIsSuccess(true)
  };


  return (
    <div
      className="border-2 border-gray-500 w-[25.5rem] p-3 text-md text-gray-500 font-semibold rounded-[4rem] text-center flex items-center justify-center gap-[0.8rem] cursor-pointer"
      onClick={handle_Google_OAuth2}
    >
      <GoogleIcon style={{ color: "red", fontSize: "1.8rem" }} />
      <span className="">Continue with Google</span>
    </div>
  );
}

export default GoogleOAuth



