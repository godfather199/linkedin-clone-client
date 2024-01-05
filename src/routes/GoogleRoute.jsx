import {
  Route,
  Navigate,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import GoogleHome from "../googleOAuth/home/GoogleHome";
import GoogleLogin from "../googleOAuth/login/GoogleLogin";
import GoogleSignup from "../googleOAuth/signup/GoogleSignup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { set_Google_User } from "../store/slices/userSlice";



 const Register_Google_Auth = ({children}) => {
  const dispatch = useDispatch()

  const {currentUser} = useSelector(state => state.user)

  const [isSuccess, setIsSuccess] = useState(false)


  // Save google oauth user registration to the db
  useEffect(() => {
    console.log('Inside useEffect Post_Google_Auth')
    const register_User = async () => {
      const {data} = await axios.get(`/auth/register/success`)
      dispatch(set_Google_User(data.userDetails))
      setIsSuccess(true)
    }
    
    if(!currentUser) {
      register_User()
    }
    // console.log('Inside function Post_Google_Auth')
  }, []) 

   if(currentUser || isSuccess) {
    return children
   }

}



 const Login_Google_Auth = ({children}) => {
  const dispatch = useDispatch()

  const {currentUser} = useSelector(state => state.user)

  const [isSuccess, setIsSuccess] = useState(false)


  // Save google oauth user registration to the db
  useEffect(() => {
    console.log('Inside useEffect Login_Google_Auth')
    const login_User = async () => {
      const {data} = await axios.get(`/auth/login/success`)
      console.log('Response Login_Google_Auth: ', data)
      dispatch(set_Google_User(data.user))
      setIsSuccess(true)
    }
    
    if(!currentUser) {
      login_User()
    }
    // console.log('Inside function Post_Google_Auth')
  }, []) 

   if(currentUser || isSuccess) {
    return children
   }

}


export const Auth_Entry_Point = ({children}) => {
  const {applicationEntryType} = useSelector(state => state.user)

  if(applicationEntryType === '') {
    return children
  }

  if (applicationEntryType === "login") {
    return <Login_Google_Auth>{children}</Login_Google_Auth>;
  }
  
  return <Register_Google_Auth>{children}</Register_Google_Auth>;
}




export const AuthRoute = ({ user, children }) => {
  // return user ? children : <Navigate to="/login" />;
  return user ? children : <Navigate to="/" />;
};



export const GuestRoute = ({ user, children }) => {
  // return user ? <Navigate to="/" /> : children;
  return user ? <Navigate to="/feed" /> : children;
};



export const AppContent = ({ user }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute user={user}>
          <GoogleHome user={user} />
        </AuthRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <GuestRoute user={user}>
          <GoogleLogin />
        </GuestRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <GuestRoute user={user}>
          <GoogleSignup />
        </GuestRoute>
      ),
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
};




