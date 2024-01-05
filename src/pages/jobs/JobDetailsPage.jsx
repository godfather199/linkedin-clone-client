import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { thunk_Apply_To_Job, thunk_Fetch_Single_Job, thunk_Unapply_To_Job } from "../../store/thunks/jobThunk"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress } from "@mui/material";
import { initial_Job_State } from "../../store/slices/jobSlice";
import { socket } from "../../App";



function JobDetailsPage() {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const { job, isLoadingApply, isSuccess } = useSelector((state) => state.job);
  const { currentUser } = useSelector((state) => state.user);
  // console.log('Job: ', job)
  
  const [isJobAuthor, setIsJobAuthor] = useState(false);
  const [jobAppliedStatus, setJobAppliedStatus] = useState(false); 



  // Fetch single job details
  useEffect(() => {
    dispatch(thunk_Fetch_Single_Job(jobId));
  }, [jobId]);
  
  
  
  // Refetch job-data after 'applying' to job
  useEffect(() => {
    if(isSuccess) {
      dispatch(thunk_Fetch_Single_Job(jobId));
      dispatch(initial_Job_State())
    }
  }, [isSuccess])



  // Check if 'Logged in user' posted the job
  useEffect(() => {
    setIsJobAuthor(currentUser?._id === job?.jobAuthor?._id);
    setJobAppliedStatus(
      job?.applicants?.some((item) => item?._id === currentUser?._id)
    );

    // return () => setIsJobAuthor(false)
  }, [job?._id, job?.applicants]);


  // console.log("Job: ", job);



  const handle_Job_Apply = () => {
    dispatch(thunk_Apply_To_Job(jobId))

    socket?.emit('job_Applied', {
      type: 'job',
      logged_In_User: {
        id: currentUser?._id,
        username: currentUser?.username 
      },
      job_Applied_Id: job?._id,
      job_Author_Id: job?.jobAuthor?._id
    })
  }


  const handle_Job_Unapply = () => {
    dispatch(thunk_Unapply_To_Job(jobId))
  }



  return (
    <div
      // style={{ border: "3px solid red" }}
      className="flex items-center justify-center bg-gray-300"
    >
      <div  className=" p-7">
        <div  className="flex gap-7 bg-white  rounded-lg shadow-lg">
          {/* Company logo */}
          <div className="">
            <img
              src={job?.companyLogo?.url}
              alt=""
              className="w-[10rem] h-[10rem] object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="flex flex-col gap-1 mt-5 ">
            <span className="text-3xl text-blue-600 font-semibold tracking-tight">
              {job?.title}
            </span>
            <span className="text-lg text-gray-400 font-semibold tracking-tight">
              {job?.company}
            </span>
            <span className="text-sm text-black font-semibold tracking-tight">
              {job?.location}
            </span>
          </div>
        </div>

        {/* Apply/Unapply */}
        <div className="my-6">
          {!isJobAuthor && (
            <button
              className={` ${
                jobAppliedStatus ? " bg-red-600" : " bg-blue-600"
              } w-[7.5rem] h-[2.7rem] text-xl text-white font-bold rounded-[2rem] ${
                isLoadingApply ? "cursor-not-allowed" : " cursor-pointer"
              }`}
              onClick={jobAppliedStatus ? handle_Job_Unapply : handle_Job_Apply}
              disabled={isLoadingApply}
            >
              {isLoadingApply ? (
                <CircularProgress
                  style={{ color: "white", width: "1.5rem", height: "1.5rem" }}
                />
              ) : (
                <>{jobAppliedStatus ? "UnApply" : "Apply"}</>
              )}
            </button>
          )}
        </div>

        {/* Job creator */}
        <div
          // style={{ border: "3px solid red" }}
          className="mb-8 flex flex-col gap-3 bg-white p-3 rounded-lg shadow-lg"
        >
          <span className="text-xl text-blue-600 font-semibold ">
            Posted By
          </span>
          <Link to={`/profile/${job?.jobAuthor?.username}`}>
            <div
              // style={{ border: "3px solid green" }}
              className=" flex gap-4 p-3 cursor-pointer"
            >
              {job?.jobAuthor?.avatar?.url ? (
                <img
                  src={job?.jobAuthor?.avatar?.url}
                  alt=""
                  className="border-2 border-blue-600 w-[3.3rem] h-[3.3rem] object-cover rounded-full"
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "2.7rem" }} />
              )}
              <div className="flex flex-col">
                <span className="text-lg text-black font-semibold">
                  {job?.jobAuthor?.name}
                </span>
                <span className="text-sm text-gray-500 font-semibold">
                  {job?.jobAuthor?.tagline}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Applicants */}
        <div
          // style={{ border: "3px solid red" }}
          className="mb-8 flex flex-col gap-3 bg-white p-4 rounded-lg shadow-lg"
        >
          <span className="text-xl text-blue-600 font-semibold">
            Job Applicants
          </span>
          {job?.applicants?.map((item) => (
            <Link key={item?._id} to={`/profile/${item?.username}`}>
              <div key={item?._id} className="flex gap-4 p-3  cursor-pointer hover:bg-gray-100 ">
                {item?.avatar?.url ? (
                  <img
                    src={item?.avatar?.url}
                    alt=""
                    className="border-2 border-blue-600 w-[3.3rem] h-[3.3rem] object-cover rounded-full"
                  />
                ) : (
                  <AccountCircleIcon style={{ fontSize: "2.7rem" }} />
                )}
                <div className="flex flex-col">
                  <span className="text-lg text-black font-semibold">
                    {item?.name}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">
                    {item?.tagline}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage