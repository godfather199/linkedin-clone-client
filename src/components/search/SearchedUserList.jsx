import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';



function SearchedUserList({
  searchedUser,
  handle_Navigate_To_User_Profile,
  add_User_To_Chat,
}) {
  const {pathname} = useLocation()
  
  
  const [currentId, setCurrentId] = useState("");

  const handle_Mouse_Enter = (userId) => {
    setCurrentId(userId);
  };

  const handle_Mouse_Leave = (userId) => {
    setCurrentId(userId);
  };

  return (
    <div
      // style={{ border: "3px solid red" }}
      className="bg-white relative z-50 mt-1"
      onMouseLeave={() => setCurrentId("")}
    >
      {searchedUser?.map((user) => (
        // <Link

        // // className='z-50'
        // >
        <div
          key={user?._id}
          onClick={() => {
            pathname === "/messages"
              ? add_User_To_Chat(user)
              : handle_Navigate_To_User_Profile(user?.username);
          }}
          //   style={{ border: "3px solid green" }}
          className={`flex items-center gap-5  p-2 my-3 cursor-pointer ${
            currentId === user?._id ? "bg-gray-200" : null
          } transform duration-100 ease-in-out`}
          onMouseEnter={() => handle_Mouse_Enter(user?._id)}
          onMouseLeave={() => handle_Mouse_Leave(user?._id)}
        >
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt=""
              className="w-[2.5rem] h-[2.5rem] rounded-full object-cover border border-black"
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "2rem" }} />
          )}
          <span className=" text-md text-gray-500  font-semibold">
            {user.name}
          </span>
        </div>
        // </Link>
      ))}
    </div>
  );
}

export default SearchedUserList