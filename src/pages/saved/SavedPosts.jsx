import {Post} from '../../components'
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunk_Fetch_Saved_Posts } from "../../store/slices/userSlice"



function SavedPosts() {
  const dispatch = useDispatch()

  const {savedPosts} = useSelector(state => state.user)


  // Fetch saved posts
  useEffect(() => {
    dispatch(thunk_Fetch_Saved_Posts())
  }, [])


  return (
    <div  className="flex items-center justify-center">
      <div className="w-[40rem]">
      {savedPosts?.map((post) => (
        <Post key = {post?._id} post = {post} />
      ))}
      </div>
    </div>
  );
}

export default SavedPosts