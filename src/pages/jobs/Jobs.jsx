import {Job} from '../'
import {SkeletonPost} from '../../components'
import { thunk_Fetch_All_Jobs } from "../../store/thunks/jobThunk"




function Jobs({title, jobs, isLoading}) {
 

  return (
    <div
      // style={{ border: "5px solid orange" }}
      className=" flex flex-col gap-8 p-4"
    >
      <span className="w-[80%] sm:w-[43%] text-3xl text-blue-600 font-semibold tracking-tighter bg-gray-100 p-2 shadow-lg mb-5">
        {title}
      </span>
      {isLoading ? (
        <>
          {Array(5)
            .fill("")
            .map((_, idx) => (
              <SkeletonPost key={idx} />
            ))}
        </>
      ) : (
        <>
          {jobs.map((item) => (
            <Job key={item._id} jobInfo={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default Jobs