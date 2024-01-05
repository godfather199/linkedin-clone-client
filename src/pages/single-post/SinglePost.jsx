import {Post} from '../../components'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunk_Fetch_Post_By_Id } from "../../store/slices/postSlice"



function SinglePost() {
  const dispatch = useDispatch()
  const {postId} = useParams()


  const {post} = useSelector(state => state.post)
  // console.log('Single Post: ', post)


  // Fetch post
  useEffect(() => {
    dispatch(thunk_Fetch_Post_By_Id(postId))
  }, [postId])



  return (
    <div className="">
      <Post post = {post} />
    </div>
  )
}

export default SinglePost