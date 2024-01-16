import { useSelector } from 'react-redux'
import {UserCapsule} from '../'
import { useEffect } from 'react'
import { fetch_All_Users_Service } from '../../services/userService'
import { useState } from 'react'

function UserCapsules() {
  const [filteredUsers, setFilteredUsers] = useState([])

  const {currentUser} = useSelector(state => state.user)


  // Fetch all users
  useEffect(() => {
    const fetch_Users = async () => {
      const { all_Users } = await fetch_All_Users_Service();

      setFilteredUsers(() =>
        all_Users
          .filter((user) => !currentUser.following.includes(user._id))
          .slice(0, 3)
      );
    }

    fetch_Users()
  }, [currentUser])
// console.log('Users: ', filteredUsers)
  
  return (
    <div className="">
      {filteredUsers?.map((user) => (
        <UserCapsule key = {user._id} user = {user}  />
      ))}
    </div>
  )
}

export default UserCapsules