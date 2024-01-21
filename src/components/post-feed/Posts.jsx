import { useDispatch, useSelector } from 'react-redux';
import {Post, SkeletonPost} from '../'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { thunk_Fetch_Post_By_Username, thunk_New_Users_Posts, thunk_Posts_Of_Following } from '../../store/slices/postSlice';
import { useParams } from 'react-router-dom';



function Posts({username}) {
  const dispatch = useDispatch()

  const {currentUser} = useSelector(state => state.user)
  const {posts, isLoading} = useSelector(state => state.post)
  // console.log('Posts: ', posts)

  const postToScrollRef = useRef(null);

  // Home feed
  useEffect(() => {
    // console.log('Inside 1 ran')
    if (username) {
      // console.log('Inside 2 ran')
      dispatch(thunk_Fetch_Post_By_Username(username));
    } else {
      if(currentUser.following.length === 0) {
        dispatch(thunk_New_Users_Posts())
      }
      else {
        dispatch(thunk_Posts_Of_Following());
      }
    }
  }, [username, currentUser]);


  return (
    <div className="">
      {isLoading ? (
        Array(5)
          .fill("")
          .map((item, idx) => <SkeletonPost key={idx} />)
      ) : (
        <>
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
      )}
    </div>
  );
}

export default Posts