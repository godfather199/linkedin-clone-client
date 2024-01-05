import axios from "axios"



export const search_Chat_Service = async (userId) => {
    const {data} =  await axios.post(
        `/api/chat`, {
            userId
        }
    )

    return data
}



export const fetch_All_Chats_Service = async () => {
    const {data} = await axios.get(
        `/api/chat`
    )

    return data
}



export const fetch_All_Messages_Service = async (chatId) => {
    const {data} = await axios.get(
        `/api/message/${chatId}`
    )

    return data
}



export const new_Message_Service = async (info) => {
    const {data} = await axios.post(
        `/api/message/new-message`, info
    )

    return data
}