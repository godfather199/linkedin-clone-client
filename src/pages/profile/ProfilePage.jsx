import { useParams } from 'react-router-dom'
import {HeaderSection, FeaturedPosts, ActivitySection, ExperienceSection} from '../'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunk_User_Details_By_Name } from '../../store/slices/userSlice'



function ProfilePage() {
  const dispatch = useDispatch()
  const {username} = useParams()

  const {userDetails} = useSelector(state => state.user)

  // console.log('Info: ', userDetails)
  // console.log('Username: ', username)


  // Fetch user details by name
  useEffect(() => {
    // console.log('useEffect ran')
    dispatch(thunk_User_Details_By_Name(username))
  }, [username])

  

  return (
    <div
      // style={{ border: "3px solid purple" }}
      className="flex items-center justify-center bg-slate-100 "
    >
      {/* Main section */}
      <div
        // style={{ border: "3px solid green" }}
        className="flex flex-col  p-3 w-[95%] sm:w-[40rem] lg:w-[60rem]"
      >
        {/* Profile Details section */}
        <div className="">
          <HeaderSection userDetails={userDetails} username={username} />
        </div>

        {/* Featured section */}
        <div className="my-5">
          <FeaturedPosts posts={userDetails?.posts} />
        </div>

        {/* Activity section */}
        <div className="">
          <ActivitySection userDetails={userDetails} />
        </div>

        {/* Experience section */}
        <div className="">
          <ExperienceSection info={userDetails?.previousOccupation} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage