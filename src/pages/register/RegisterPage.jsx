import {GoogleOAuth} from '../../components'
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { initial_User_State, thunk_Register_User } from "../../store/slices/userSlice";



// Form validiation schema
const schema = yup.object().shape({
  username: yup.string().required('Enter a username'),
  name: yup.string().required('Enter a name'),
  email: yup.string().required('Enter an email'),
  password: yup.string().min(5).max(16).required('Password is required')
})


function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {isLoading, isSuccess} = useSelector(state => state.user)

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  })



  // After successful user registration
  useEffect(() => {
    if(isSuccess) {
      setTimeout(() => {
        dispatch(initial_User_State())
        navigate('/')
      }, 1800);
    }
  }, [isSuccess])



  const handle_Register_Submit = (data) => {
    dispatch(thunk_Register_User(data))
    reset()
  }

  

  return (
    <div className=" bg-gray-100">
      <div className="ml-8 mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 84 21"
          preserveAspectRatio="xMinYMin meet"
          version="1.1"
          focusable="false"
          // class="lazy-loaded"
          aria-busy="false"
          height="2rem"
          width="8rem"
          color="blue"
        >
          <g
            // class="inbug"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
              className="bug-text-color"
              transform="translate(63.000000, 0.000000)"
            ></path>
            <path
              d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
              // class="background"
              fill="currentColor"
            ></path>
          </g>
          <g className="linkedin-text">
            <path
              d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
              fill="currentColor"
            ></path>
            <path
              d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
              fill="currentColor"
            ></path>
            <polygon
              fill="currentColor"
              points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"
            ></polygon>
            <path
              d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
              fill="currentColor"
            ></path>
            <path
              d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
              fill="currentColor"
            ></path>
            <polygon
              fill="currentColor"
              points="3 3 0 3 0 18 9 18 9 15 3 15"
            ></polygon>
          </g>
        </svg>
      </div>

      <div
        // style={{ border: "3px solid purple" }}
        className="flex items-center justify-center m-5"
      >
        <div className="">
          <div className="">
            <span className="text-4xl tracking-tighter text-black">
              Make the most of your professional life
            </span>
          </div>

          {/* Form section */}
          <div className="mt-[6rem]">
            <form
              // style={{ border: "3px solid purple" }}
              className="h-[22rem] flex flex-col items-center justify-around"
              onSubmit={handleSubmit(handle_Register_Submit)}
              autoComplete="off"
            >
              <div className="flex flex-col gap-2 my-[1.5rem]">
                <span className="text-sm font-semibold text-gray-600 mx-2.5">
                  Username
                </span>
                <input
                  autoFocus
                  type="text"
                  {...register("username")}
                  className="border-2 border-black p-3 w-[23rem] mx-2 rounded-lg"
                />
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors.username?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-7">
                <span className="text-sm font-semibold text-gray-600 mx-2.5">
                  Name
                </span>
                <input
                  type="text"
                  {...register("name")}
                  className="border-2 border-black p-3 w-[23rem] mx-2 rounded-lg"
                />
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors.name?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-7">
                <span className="text-sm font-semibold text-gray-600 mx-2.5">
                  Email
                </span>
                <input
                  type="text"
                  {...register("email")}
                  className="border-2 border-black p-3 w-[23rem] mx-2 rounded-lg"
                />
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors.email?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600 mx-2.5">
                  Password
                </span>
                <input
                  type="password"
                  {...register("password")}
                  className="border-2 border-black p-3 w-[23rem] mx-2 rounded-lg"
                />
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors.password?.message}
                </span>
              </div>

              <div className=" flex ">
                <button
                  type="submit"
                  className=" w-[25rem] p-2.5 bg-blue-600 text-white text-lg font-semibold rounded-[2rem] mt-10"
                  // disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "whitesmoke" }} />
                  ) : (
                    "Agree & Join"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer section */}
          <div className="mt-[8rem] mb-5 flex flex-col items-center">
            <div
              // style={{ border: "3px solid red" }}
              className="flex items-center justify-around w-[25rem]"
            >
              <div className="border border-gray-500 my-3 w-[11rem]" />
              <span className="">or</span>
              <div className="border border-gray-500 my-3 w-[11rem]" />
            </div>
            <div className="my-10">
              <GoogleOAuth type = 'register' />
            </div>

            {/* <div
              // style={{ border: "3px solid red" }}
              className="flex items-center justify-around w-[25rem]"
            >
              <div className="border border-gray-500 my-3 w-[11rem]" />
              <span className="">or</span>
              <div className="border border-gray-500 my-3 w-[11rem]" />
            </div> */}
            <Link to="/">
              <div className="flex ">
                <span className="border-2 border-gray-500 w-[25.5rem] p-3 text-md text-gray-500 font-semibold rounded-[4rem] text-center">
                  Already on LinkedIn ? Sign In
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage