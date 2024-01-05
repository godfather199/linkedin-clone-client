import {LeftInfoTile, Posts} from '../../components'
import { useDispatch } from 'react-redux'
import { thunk_Fetch_Post_By_Username } from '../../store/slices/postSlice'
import { useParams } from 'react-router-dom'


function AllPosts() {
  const {username} = useParams()

  return (
    <div
      // style={{ border: "5px solid red" }}
      className="flex flex-col md:flex-row gap-2 m-4 "
    >
      <div  className=" md:m-5">
        <LeftInfoTile />
      </div>
      <div
        // style={{ border: "3px solid purple" }}
        className="  md:w-[70%] max-w-[50rem]"
      >
        <Posts username={username} />
      </div>
    </div>
  );
}

export default AllPosts