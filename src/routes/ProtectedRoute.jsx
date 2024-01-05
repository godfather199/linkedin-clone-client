import { useEffect, useState } from "react"
import { authenticateUserService } from "../services/userService"
import { useSelector } from "react-redux"
import { Backdrop, CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"




function ProtectedRoute({children}) {
  const {currentUser}  = useSelector(state => state.user)
  const [authenticationToken, setAuthenticationToken] = useState(true)
  const [isLoading ,setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const {success: authenticateState} = await authenticateUserService()
      setAuthenticationToken(authenticateState)
      setIsLoading(false)
    }

    fetchData()

  }, [])



  if(isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }


  if(!authenticationToken) {
    return <Navigate to = '/' />
  }


  return children
}

export default ProtectedRoute