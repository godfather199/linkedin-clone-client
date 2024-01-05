import { yupResolver } from '@hookform/resolvers/yup';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { thunk_Create_Job } from '../../store/thunks/jobThunk';
import { initial_Job_State } from '../../store/slices/jobSlice';
import { Backdrop, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


// Form validiation schema
const schema = yup.object().shape({
  title: yup.string().required("**Enter a title"),
  company: yup.string().required("**Enter a company"),
  location: yup.string().required("**Enter an location")
});



function NewJobPage({setValue}) {
  const dispatch = useDispatch()

  const {isLoadingApply, isSuccess} = useSelector(state => state.job)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [postImage, setPostImage] = useState("");
  const [postPreview, setPostPreview] = useState("");


  // Post successfull 'job creation'
  useEffect(() => {
    if(isSuccess) {
      reset()
      setPostPreview('')

      setTimeout(() => {
        dispatch(initial_Job_State())
        setValue(1)
      }, 1800);
    }
  }, [isSuccess])



  // Upload company image
  const handleUploadImage = (e) => {
    const reader = new FileReader();

    setPostImage("");
    setPostPreview("");

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log('This function ran')
        setPostImage(reader.result);
        setPostPreview(reader.result);
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const handle_Job_Submit_Form = ({title, company, location}) => {
    if(postImage.length === 0) {
        return toast.error('Company Logo is required', {
            duration: 1500,
            position: "bottom-center"
        })
    }

    const new_Job_Data = {
      title,
      company,
      location,
      companyImg: postImage
    }

    dispatch(thunk_Create_Job(new_Job_Data))
   
  }


  return (
    <div
      // style={{ border: "3px solid green" }}
      className="flex items-center justify-center p-2"
    >
      <div
        // style={{ border: "3px solid purple" }}
        className="w-[95%] md:w-2/3 flex flex-col gap-3"
      >
        <span className="w-[17rem] text-3xl text-blue-600 font-semibold tracking-tighter bg-gray-100 p-2 shadow-lg mb-5">
          Post a job for free
        </span>
        <div  className="">
          <form
            // style={{ border: "3px solid blue" }}
            onSubmit={handleSubmit(handle_Job_Submit_Form)}
            className="h-[35rem] flex flex-col justify-around"
          >
            {/* Upload Company Image */}
            <div className="my-3  w-[22rem]">
              {postPreview && (
                <img
                  src={postPreview}
                  alt=""
                  className=" h-[10rem] w-[20rem] object-cover "
                />
              )}
              <label className="cursor-pointer mt-3 flex items-center justify-center">
                <CloudUploadIcon style={{ fontSize: "2rem", color: "blue" }} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>
            </div>

            <div className="">
              <div
                // style={{ border: "3px solid green" }}
                className="w-[22rem] lg:w-[30rem]  flex items-center justify-between"
              >
                <span className="w-[5rem] text-md lg:text-xl font-serif text-gray-700">
                  Job Title
                </span>
                <input
                  type="text"
                  {...register("title")}
                  className="border-2 border-gray-600 outline-none text-sm text-gray-600 p-2 md:p-3 w-[20rem] rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors?.title?.message}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-[22rem] lg:w-[30rem]  flex items-center justify-between">
                <span className="w-[5rem] text-md lg:text-xl font-serif text-gray-700">
                  Company
                </span>
                <input
                  type="text"
                  {...register("company")}
                  className="border-2 border-gray-600 outline-none text-sm text-gray-600 p-2 md:p-3 w-[20rem] rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors?.company?.message}
                </span>
              </div>
            </div>

            <div className=" mt-3">
              <div className="w-[22rem] lg:w-[30rem]  flex items-center justify-between">
                <span className="w-[5rem] text-md lg:text-xl font-serif text-gray-700">
                  Location
                </span>
                <input
                  type="text"
                  {...register("location")}
                  className="border-2 border-gray-600 outline-none text-sm text-gray-600 p-2 md:p-3 w-[20rem] rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-semibold text-red-600 mx-3">
                  {errors?.location?.message}
                </span>
              </div>
            </div>

            <div className=" mt-5">
              <button
                type="submit"
                className="bg-blue-600 w-[30%] text-white text-lg font-semibold p-2 rounded-lg shadow-lg"
                disabled={isLoadingApply}
              >
                {isLoadingApply ? <CircularProgress /> : "Create Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewJobPage