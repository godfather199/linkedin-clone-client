import { useEffect, useState } from "react";
import { backend_URL } from "../googleOAuth/home/GoogleHome";
import { useDispatch } from "react-redux";
import axios from "axios";
import { set_Google_User } from "../store/slices/userSlice";



function useWindowStatus() {
    console.log('Inside useWindowStatus')
  const dispatch = useDispatch()

  const [isSuccess, setIsSuccess] = useState(false);
  console.log('Success: ', isSuccess)

  const handleGoogleRegistration = () => {
    console.log('Inside Google Registration')
    const newWindow = window.open(
      `${backend_URL}/auth/google/callback`,
      "_self"
    );

    const checkWindowClosed = () => {
        console.log('Inside checkWindowClosed')
      if (newWindow.closed) {
        setIsSuccess(true);
        window.removeEventListener("beforeunload", checkWindowClosed);
      }
    };

    window.addEventListener("beforeunload", checkWindowClosed);
  };

  useEffect(() => {
    const register_User = async () => {
        console.log('Inside register_User')
      const { data } = await axios.get(`/auth/login/success`);
      dispatch(set_Google_User(data.userDetails));
    };

    if(isSuccess) {
      register_User();
    }

    // return () => {
    //   setIsSuccess(false);
    //   window.removeEventListener("beforeunload", checkWindowClosed);
    // };
  }, [isSuccess]);

  return {
    handleGoogleRegistration
  }
}



export default useWindowStatus