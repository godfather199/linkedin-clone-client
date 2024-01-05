import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function LeftInfoTile() {
  const {currentUser} = useSelector(state => state.user)
  // console.log('LeftInfoTile: ', currentUser)

  return (
    <div className="w-full md:w-[15rem] lg:w-[25rem] xl:w-[28rem] h-[11rem] md:h-[12rem] border border-gray-400 flex flex-col  items-center justify-between p-4 md:p-6 rounded-lg bg-white shadow-lg ">
      <div className="">
        {currentUser?.avatar?.url ? (
          <img
            src={currentUser?.avatar?.url}
            alt=""
            className="h-[3.5rem] w-[3.5rem] rounded-full object-cover shadow-lg border-2 border-blue-600"
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "3rem" }} />
        )}
      </div>
      <div className="">
        <p className="text-xs h-[2rem] ">{currentUser?.tagline}</p>
      </div>
      <div className="">
        <span className="text-lg md:text-sm text-gray-700 font-semibold md:font-bold">
          {currentUser?.name}
        </span>
      </div>
    </div>
  );
}

export default LeftInfoTile