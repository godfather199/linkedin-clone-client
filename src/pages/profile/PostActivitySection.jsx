import {ActivityPost} from '../'
import { useMemo, useState } from "react"
import useTime from "../../hooks/useTime"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useParams } from 'react-router-dom';




function PostActivitySection({details}) {
  // console.log('Details: ', details)
  const {username} = useParams()


  const latestPost = useMemo(() => {
    return details?.posts?.slice(-2).reverse()
  }, [details])


  return (
    <>
      {latestPost?.map((post) => (
        <ActivityPost key={post?._id} post={post} name={details?.name} />
      ))}
      <Link to={`/all-posts/${username}`}>
        <div
          // style={{ border: "3px solid purple" }}
          className="  mt-4 text-center"
        >
          <span className="text-lg text-gray-500 font-semibold">
            Show all posts
          </span>
          <ArrowForwardIcon style={{ color: "gray", marginLeft: '10px' }} />
        </div>
      </Link>
    </>
  );
}

export default PostActivitySection