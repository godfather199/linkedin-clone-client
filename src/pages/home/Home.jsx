import { useEffect } from 'react';
import {LeftInfoTile, Navbar, CreatePost,NewsArticles, Posts} from '../../components'
import {UserCapsules} from '../'
import { useDispatch, useSelector } from 'react-redux';
import { set_Application_Entry_Type } from '../../store/slices/userSlice';


function Home() {
  const dispatch = useDispatch()
  // console.log('Inside Home')

  
  useEffect(() => {    
    dispatch(set_Application_Entry_Type(''));
  }, []);

  return (
    <div className=" ">
      {/* Top Section */}
      {/* <div className="">
        <Navbar />
      </div> */}

      {/* Bottom Section */}
      <div className="   p-5 md:p-3 mt-5 bg-gray-100  ">
        <div className=" flex flex-col md:flex-row  gap-[3rem] xl:gap-[6rem]">
          {/* Left Section */}
          <div className="relative ">
            <LeftInfoTile />
          </div>

          {/* Left Bottom Section */}
          <div className="hidden xl:block  w-1/4 mx-2 absolute top-[22rem]">
            <UserCapsules />
          </div>

          {/* Middle Section */}
          <div className=" w-full md:w-[35rem] lg:w-[50rem] mr-3">
          {/* <div className=" w-full md:w-[35rem] lg:w-[40rem] mr-3"> */}
            <CreatePost />
            <Posts />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home