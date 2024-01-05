// import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {AppContent} from './routes/GoogleRoute'


// export const backend_URL = import.meta.env.VITE_BACKEND_URL


// function App() {
//   const [user, setUser] = useState(null);

//   const getUser = async () => {
//     try {
//       const url = `${backend_URL}/auth/login/success`;
//       const { data } = await axios.get(url, { withCredentials: true });
//       console.log("Response: ", data);
//       setUser(data.user._json);
//     } catch (err) {
//       console.log("Error: ", err);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return <AppContent user={user} />;
// }

// export default App;




// **********Working Version**************

import axios from "axios"
import Route from "./routes/Route"
import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"


export var socket
export const backend_URL = import.meta.env.VITE_BACKEND_URL


// Setting axios defaults globally
axios.defaults.baseURL = backend_URL
axios.defaults.withCredentials = true



function App() {
  const {currentUser} = useSelector(state => state.user)

  const [user, setUser] = useState(null);


  // Google oAuth user
  // const getUser = async () => {
  //   try {
  //     const url = `${backend_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     console.log("Response: ", data);
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log("Error: ", err);
  //   }
  // };
  


  // Google oAuth user
  // useEffect(() => {
  //   // getUser();
  // }, []);



  // Connect to 'socket-server'
  useEffect(() => {
    socket = io(backend_URL);

    socket?.emit("setup", currentUser);

    socket?.on("connected", () => {
      console.log("Connected to socket server");
    });
  }, []);




  return (
    <>
      <Toaster />
      {/* <Route user = {user} /> */}
      <Route  />
    </>
  )
}

export default App





// sm	640px	

// md	768px	

// lg	1024px	

// xl	1280px

// 2xl	1536px