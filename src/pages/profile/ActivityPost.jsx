import useTime from "../../hooks/useTime"




function ActivityPost({post, name}) {
  const {timeAgo} = useTime(post?.createdAt)


  return (
    <div
      // style={{ border: "3px solid red" }}
      className=" flex flex-col gap-4 mt-5 p-2"
    >
      <div className="">
        {/* Calculate time elapsed */}
        <span className="text-md text-gray-600 font-semibold">
          {name}{" "}
          <span className="text-gray-400 font-medium text-sm">posted this</span>{" "}
        </span>
      </div>
      <div className="">
        <span className="">{post?.caption}</span>
      </div>
      <div
        // style={{ border: "3px solid purple" }}
        className="flex items-center justify-between"
      >
        <div
        //   style={{ border: "3px solid purple" }}
          className="w-[3rem] flex justify-between"
        >
          <div
            // style={{ border: "3px solid purple" }}
            className=" flex"
          >
            <img
              src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
              alt="like"
              className="-mx-[3.5px]"
            />
            <img
              src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22"
              alt="love"
              className="-mx-[3.5px]"
            />
            <img
              src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
              alt="celebrate"
              className="-mx-[3.5px]"
            />
          </div>
          <div className="">{post?.likes?.length}</div>
        </div>
        <div className="">
          <span className="">{post?.comments?.length} comments</span>
        </div>
      </div>
      <div className="border border-gray-100" />
    </div>
  );
}

export default ActivityPost