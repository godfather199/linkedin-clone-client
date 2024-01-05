import {Link} from 'react-router-dom'


function Job({jobInfo}) {
  return (
    <Link to={`/job/${jobInfo?._id}`}>
      <div
        // style={{ border: "3px solid green" }}
        className=" max-w-[50rem] flex gap-[3rem] mb-5 border border-gray-300 rounded-[4px]  p-2 shadow-lg"
      >
        <div className="">
          <img
            // style={{ border: "3px solid purple" }}
            src={jobInfo?.companyLogo.url}
            alt=""
            className="w-[10rem] h-[8rem] object-cover"
          />
        </div>
        <div
          // style={{ border: "3px solid red" }}
          className="flex flex-col gap-3 w-[18rem]"
        >
          <span className="text-lg text-blue-600 font-semibold">
            {jobInfo?.title}
          </span>
          <span className="text-sm text-gray-400 font-semibold">
            {jobInfo?.company}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Job