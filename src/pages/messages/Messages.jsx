import { useSelector } from "react-redux"




function Messages({isTyping}) {
  const {currentChat, chatInfo, fetchMessageLoading} = useSelector(state => state.chat)
  const {currentUser} = useSelector(state => state.user)

  // console.log('Messages: ', currentChat)
// console.log('Info: ', chatInfo)

  return (
    <div
      // style={{ border: "3px solid blue" }}
      className=" h-[28rem] overflow-y-scroll p-3"
    >
      {/* Messages */}
      <div className="">
        {currentChat?.map((item) => (
          <div
            // style={{ border: "3px solid green" }}
            key={item?._id}
            className={` mb-6  `}
          >
            <span
              // style={{ border: "3px solid red" }}
              className={` border border-gray-200 w-[60%] sm:w-[45%] flex  ${
                item?.sender?._id === currentUser?._id
                  ? " justify-end ml-[10rem] sm:ml-[18rem] md:ml-[22rem] xl:ml-[30rem] "
                  : "mr-[20rem]"
              } p-[0.8rem] rounded-[1rem] bg-green-200 text-lg text-gray-500`}
            >
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages