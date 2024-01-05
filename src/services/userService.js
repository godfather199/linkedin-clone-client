import axios from "axios"


export const register_User_Service = async (userData) => {
  const {data} = await axios.post(
    `/api/user/register`, userData
  )

  return data
}



export const loginUserService = async (userData) => {
    const {data} = await axios.post(
        `/api/user/login`, userData
    )

    return data
}



export const authenticateUserService = async () => {
  try {
    const { data } = await axios.get(`/api/user/authenticate-user`);

    return data
  } catch (error) {
    return error.response.data
  }
};



export const fetch_User_By_Name_Service = async (username) => {
  // console.log('Inside service')
  const {data} = await axios.get(
    `/api/user/user-details/${username}`
  )

  return data
}



export const search_Bar_Service = async (info) => {
  const {data} = await axios.get(
    `/api/user/search-bar?userInfo=${info}`
  )

  return data
}



export const follow_Unfollow_User_Service = async (userId) => {
  const {data} = await axios.get(
    `api/user/follow/${userId}`
  )

  return data
}



export const update_User_Info_Service = async (userInfo) => {
  const {data} = await axios.put(
    `/api/user/edit-user`, userInfo
  )

  return data
}



export const logout_User_Service = async () => {
  const {data} = await axios.get(
    `/api/user/logout`
  )

  return data
}



export const save_Post_Service = async (postId) => {
  const {data} = await axios.post(
    `/api/user/saved-post/${postId}`
  )

  return data
}



export const logged_In_User_Info_Service = async () => {
  const {data} = await axios.get(
    `/api/user/logged-in-user`
  )

  return data
}



export const user_Details_By_Id_Service = async (userId) => {
  const {data} = await axios.get(
    `/api/user/user-details-id/${userId}`
  )

  return data
}



export const fetch_Saved_Posts_Service = async () => {
  const {data} = await axios.get(
    `/api/user/saved-post`
  )

  return data
}



export const remove_Saved_Post = async (postId) => {
  const {data} = await axios.delete(
    `/api/user/saved-post/${postId}`
  )

  return data
}