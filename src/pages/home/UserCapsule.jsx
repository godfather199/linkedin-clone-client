import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { thunk_Follow_Unfollow } from "../../store/slices/userSlice";

function UserCapsule({ user }) {
  const dispatch = useDispatch()


  const handle_Follow = (e) => {
    e.stopPropagation()
    // console.log('User followed')
    dispatch(thunk_Follow_Unfollow(user._id))
  }

  
  return (
    <div className=" border border-gray-500 bg-white w-[20rem] mb-3  p-3 rounded-[0.4rem] shadow-lg">
      <div className="flex justify-between">
        {/* Image */}
        <div className="">
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt=""
              className="border-2 border-blue-600 w-[2.8rem] h-[2.8rem] object-contain rounded-full"
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "2.3rem" }} />
          )}
        </div>

        {/* Follow button */}
        <div className="">
          <Button
            className=""
            variant="contained"
            endIcon={<AddIcon />}
            onClick={(e) => handle_Follow(e)}
          >
            Follow
          </Button>
        </div>
      </div>

      {/* Info */}
      <Link to={`/profile/${user?.username}`}>
        <div className="flex flex-col gap-2 mt-3">
          <span className="text-md text-gray-600 font-semibold text-center">
            {user?.name}
          </span>
          <span className="text-xs text-gray-500 font-light">
            {user?.tagline}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default UserCapsule;
