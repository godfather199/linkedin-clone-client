import { useEffect } from "react";
import { useState } from "react";



function ExperienceSection({info}) {
  

  return (
    <div className="p-4 mb-5 bg-white rounded-[0.6rem] border border-gray-300">
      <div className="">
        <span className="ml-4 text-2xl font-bold">Experience</span>
      </div>
      {info?.map((item) => (
        <div  key={item?._id} className="flex gap-10 m-4">
          <div className="">
            <img
              src="https://media.licdn.com/dms/image/C4D0BAQEW_4W2P_77SA/company-logo_100_100/0/1630548807734/q2software_logo?e=1707350400&v=beta&t=-TyFFo0OBKcDdIamcxSok4dPCUwYGCzChzEjTM8HLs4"
              alt=""
              className=" w-[3rem] h-[3rem]"
            />
          </div>
          <div  className="flex flex-col gap-1 p-2">
            <span className="text-lg font-semibold tracking-wide">{item?.title}</span>
            <span className="">{item?.company}</span>
            <span className="text-sm text-gray-500">{item?.timeline}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperienceSection