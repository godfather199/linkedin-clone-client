import axios from "axios"


export const createPostService = async (postData) => {
    const {data} = await axios.post(
        `/api/post/create-post`, postData
    )

    return data
}


export const post_Of_Following_Service = async () => {
    const {data} = await axios.get(
        `/api/post/posts-following`
    )

    return data
}



export const like_Unlike_Post_Service = async (postId) => {
    const {data} = await axios.get(
        `/api/post/like-post/${postId}`
    )

    return data
}



export const fetch_Post_By_Username_Service = async (username) => {
    const {data} = await axios.get(
        `/api/post/fetch-post/${username}`
    )

    return data
}



export const edit_Post_Service = async (postData) => {
    const {postId, ...others} = postData

    const {data} = await axios.put(
        `/api/post/edit-post/${postId}`,
        others
    )

    return data
}




export const delete_Post_Service = async (postId) => {
    const {data} = await axios.delete(
        `/api/post/delete-post/${postId}`
    )

    return data
}




export const featured_Post_Service = async (postId) => {
    const {data} = await axios.get(
        `/api/post/featured-post/${postId}`
    )

    return data
}




export const add_Comment_Service = async ({comment, postId}) => {
    const {data} = await axios.post(
        `/api/post/comment/${postId}`,
        {comment}
    )

    return data
}



export const fetch_Post_By_Id_Service = async (postId) => {
    const {data} = await axios.get(
        `/api/post/${postId}`
    )

    return data
}