import {EditImageModal, LoggedInUserHeader} from '../'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import { initial_User_State, thunk_Follow_Unfollow, thunk_Update_User, thunk_User_Details_By_Name } from "../../store/slices/userSlice";
import useImage from '../../hooks/useImage';
import { socket } from '../../App';
// import Avatar from '../../assets/Avatar.avif'




function HeaderSection({userDetails, username}) {
  const dispatch = useDispatch()

  const {currentUser, isSuccess, isLoading} = useSelector(state => state.user)

  
  const [isFollowing, setIsFollowing] = useState(false)
  const [openEditImageModal, setOpenEditImageModal] = useState(false)
  const [avatarImage, setAvatarImage] = useState('')
  const [avatarImageUrl, setAvatarImageUrl] = useState('')
  const [imgUrlConverted, setImgUrlConverted] = useState('')
  const [showUpdateBtn, setShowUpdateBtn] = useState(false)

  

  // console.log('Avatar: ', avatarImage)
  
  const { imageData } = useImage(avatarImageUrl);


  // base64 image data to display in modal
  useEffect(() => {
    // console.log('This ran 1')
    if(userDetails?.avatar?.url) {
      setAvatarImage(imageData);
      setImgUrlConverted(imageData)
    }
  }, [imageData, openEditImageModal])


  useEffect(() => {
    setIsFollowing(currentUser?.following?.includes(userDetails?._id))
  }, [userDetails?.following])


  // Follow-unfollow user
  const handleFollow = () => {
    dispatch(thunk_Follow_Unfollow(userDetails?._id))

    if(!isFollowing) {
      socket?.emit('follow_user', {
        type: 'follow',
        logged_In_User: {
          id: currentUser?._id,
          username: currentUser?.username
        },
        user_Followed: userDetails?._id
      })
    }
  }


  useEffect(() => {
    if(isSuccess) {
      dispatch(thunk_User_Details_By_Name(username))
      dispatch(initial_User_State())
      setOpenEditImageModal(false)
    }
  }, [isSuccess])



  const handle_Edit_Image_Modal = () => {
    if(currentUser?.username !== username) {
      return
    }

    if (userDetails?.avatar?.url) {
      // console.log('This ran 1')
      setAvatarImageUrl(userDetails?.avatar?.url)
    } 
    // else {
    //   setAvatarImageUrl(
    //     "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg"
    //   );
    // }

    setOpenEditImageModal(true);
  }



  const handle_Avatar_Edit_Image = (e) => {
    const reader = new FileReader()

    setAvatarImage('')

    reader.onload = () => {
      if(reader.readyState === 2) {
        setAvatarImage(reader.result)
        if(userDetails?.avatar?.url) {
          handle_New_Uploaded_Image(reader.result)
        }
        else {
          setShowUpdateBtn(true)
        }
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }


  const handle_New_Uploaded_Image = (newImgInfo) => {
    if(imgUrlConverted !== newImgInfo) {
      setShowUpdateBtn(true)
    }
  }
  

  const handle_Avatar_Image_Update = () => {
    if(avatarImage !== '') {
      dispatch(thunk_Update_User({avatar: avatarImage}))
    }
  }


  
  return (
    <div className="bg-white rounded-[0.6rem]  border border-gray-300">
      {/* Header section */}
      <div
        // style={{ border: "5px solid purple" }}
        className=" w-full   relative z-auto "
      >
        <img
          src={
            userDetails?.coverImage?.url
              ? userDetails?.coverImage?.url
              : "https://img.freepik.com/free-vector/mosaic-patterned-background_53876-91674.jpg?size=626&ext=jpg&ga=GA1.1.399443002.1699970351&semt=ais"
          }
          className="h-[10rem] w-full object-cover"
        />
        <img
          src={
            userDetails?.avatar?.url
              ? userDetails?.avatar?.url
              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg"
          }
          alt=""
          className={`border-[6px] border-white w-[9rem] h-[9rem] rounded-full object-cover absolute top-[6rem] left-[1.3rem] ${
            currentUser?.username === username ? "cursor-pointer" : null
          } `}
          onClick={handle_Edit_Image_Modal}
        />
      </div>

      <EditImageModal
        openEditImageModal={openEditImageModal}
        setOpenEditImageModal={setOpenEditImageModal}
        avatarImage={avatarImage}
        setAvatarImage={setAvatarImage}
        handle_Avatar_Edit_Image={handle_Avatar_Edit_Image}
        showUpdateBtn={showUpdateBtn}
        setShowUpdateBtn={setShowUpdateBtn}
        userDetails={userDetails}
        handle_Avatar_Image_Update={handle_Avatar_Image_Update}
        isLoading={isLoading}
      />

      {currentUser?.username === username ? (
        <>
          <LoggedInUserHeader />
        </>
      ) : (
        <>
          {/* Bio section */}
          <div
            // style={{ border: "3px solid green" }}
            className="mt-[6rem] flex gap-2"
          >
            <div className="flex flex-col gap-3 w-[25rem] p-2">
              <span className=" text-2xl font-semibold">
                {userDetails?.name}
              </span>
              <span className="text-sm text-gray-800">
                {userDetails?.tagline}
              </span>
            </div>
            <div
              // style={{ border: "3px solid red" }}
              className="flex flex-col justify-center gap-2 p-2"
            >
              <div className="flex items-center gap-3 ">
                <img
                  src="https://media.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_100_100/0/1519856215226?e=1706745600&v=beta&t=5_XXRZtyDXT7QBk0JIEK62X87nxzIa-sSUPxlD-ybR0"
                  alt=""
                  className="h-10 w-10"
                />
                <span className="text-sm text-gray-800 font-semibold">
                  {userDetails?.previousOccupation?.[0]?.company}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <img
                  src="https://media.licdn.com/dms/image/C4D0BAQEVWIaZwNjX1Q/company-logo_100_100/0/1519918817494?e=1706745600&v=beta&t=vSINKMGUP0KK6CIBAXG0bJhTXCrV4Q_Tosgh66ZFSf0"
                  alt=""
                  className="h-10 w-10"
                />
                <span className="w-2/3">{userDetails?.education?.name}</span>
              </div>
            </div>
          </div>

          {/* Hashtag section */}
          <div
            // style={{ border: "3px solid purple" }}
            className="flex flex-col gap-3 p-3 my-2"
          >
            <span className="text-md text-gray-600 font-semibold">
              Talks about{" "}
              <span className="">
                {userDetails?.hashtags?.map((item, idx) => (
                  <span key={idx} className="">{`#${item}, `}</span>
                ))}
              </span>
            </span>
            <span className="text-md text-gray-600 font-semibold">
              {userDetails?.city}
            </span>
          </div>

          {/* Stats section */}
          <div className="ml-3">
            <span className="text-xl font-ligh text-gray-700">
              {userDetails?.followers?.length}{" "}
              <span className="text-lg  text-gray-400">follower</span>
            </span>
            {/* <span className="">500+ connections</span> */}
          </div>

          {/* Buttons */}
          <div
            // style={{ border: "5px solid orange" }}
            className="h-[7rem] w-[18rem] flex items-center justify-between px-4"
          >
            <button
              className={`bg-blue-700 text-white p-2 w-[7rem] text-md font-semibold rounded-[3rem] hover:bg-blue-900 ${
                currentUser?.username === username ? "hidden" : "block"
              }`}
            >
              Message
            </button>
            <div
              onClick={handleFollow}
              className={`flex items-center justify-center border-2 border-gray-700 text-gray-500  p-[0.4rem]  w-[7.3rem] text-md font-semibold rounded-[2.8rem] hover:bg-gray-200 transition ease-in-out duration-100 cursor-pointer ${
                currentUser?.username === username ? "hidden" : "block"
              }`}
            >
              {!isFollowing && <AddIcon />}
              <span>{isFollowing ? "Following" : "Follow"}</span>
              {isFollowing && <DoneIcon style={{ fontSize: "1.2rem" }} />}
            </div>
            {/* <button className="">More</button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderSection