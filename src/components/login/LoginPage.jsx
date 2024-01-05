import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from "react-redux"
import { initial_User_State, thunkLoginUser } from "../../store/slices/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import GoogleOAuth from "../google/GoogleOAuth"



// Form validiation schema
const schema = yup.object().shape({
  userInfo: yup.string().required('Enter email or username'),
  password: yup.string().min(5).max(16).required('Password is required')
})


function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess, currentUser, isLoading} = useSelector(state => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });



  const formHandler = ({userInfo, password}) => {
    // console.log(('Data: ', data))
    // return

    dispatch(thunkLoginUser({userInfo, password}))
    reset()
  }
  
  
  // Handle form after submission
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(initial_User_State());
        navigate("/feed");
      }, 1800);
    }
  }, [isSuccess]);



  return (
    <div className="h-[35rem] w-[35rem]">
      <div className="mb-3">
        <span
          // style={{ border: "3px solid purple" }}
          className="flex items-center w-[25rem] ml-3  text-3xl  text-amber-800 tracking-wide"
        >
          Find jobs through your community
        </span>
      </div>

      {/* Form section */}
      <div className="h-2/3">
        <form
          // style={{ border: "3px solid purple" }}
          className="h-[22rem] flex flex-col justify-around"
          onSubmit={handleSubmit(formHandler)}
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-600 mx-2.5">
              Email or username
            </span>
            <input
              autoFocus
              type="text"
              {...register("userInfo")}
              className="border-2 border-black p-3 w-2/3 mx-2 rounded-lg"
            />
            <span className="text-sm font-semibold text-red-600 mx-3">
              {errors.userInfo?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-600 mx-2.5">
              Password
            </span>
            <input
              type="password"
              {...register("password")}
              className="border-2 border-black p-3 w-2/3 mx-2 rounded-lg"
            />
            <span className="text-sm font-semibold text-red-600 mx-3">
              {errors.password?.message}
            </span>
          </div>
          <div className=" flex ">
            <button
              type="submit"
              className=" w-[25rem] p-2.5 bg-blue-600 text-white text-lg font-semibold rounded-[2rem] mt-5"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "whitesmoke" }} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer section */}
      <div  className=" p-1 h-[14rem]">
        <div
          // style={{ border: "3px solid red" }}
          className="flex items-center justify-around w-[25rem]"
        >
          <div className="border border-gray-500 my-3 w-[11rem]" />
          <span className="">or</span>
          <div className="border border-gray-500 my-3 w-[11rem]" />
        </div>
        <div className="my-8">
          <GoogleOAuth type = 'login' />
        </div>
        <Link to="/register">
          <div className="flex mt-5">
            <span className="border-2 border-gray-500 w-[25.5rem] p-3.5 text-md text-gray-500 font-semibold rounded-[2rem] text-center">
              New to LinkedIn ? Join now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage