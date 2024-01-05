import { createSlice } from "@reduxjs/toolkit"
import { thunk_Fetch_All_Chats, thunk_Fetch_All_Messages, thunk_New_Message, thunk_Search_Chat } from "../thunks/chatThunk"



const initialState = {
    isLoading: false,
    fetchMessageLoading: false,
    newMessageLoading: false,
    isSuccess: false,
    newMessageSuccess: false,
    new_Message_Info: {},
    chatInfo: {},
    currentChat: [],
    chats: []
}



export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset_Current_Chat: (state) => {
            state.currentChat = []
        },
        reset_New_Message: (state) => {
          state.newMessageSuccess = false
        },
        selected_Chat_Info: (state, {payload}) => {
          state.chatInfo = payload
        },
        add_New_Message: (state, {payload}) => {
          console.log('Payload: ', payload)
          if(payload.chat._id !== state.chatInfo._id) {
            return
          }
          if(!state.currentChat.find(item => item._id === payload._id)) {
            state.currentChat = [...state.currentChat, payload] 
          }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(thunk_Search_Chat.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Search_Chat.fulfilled, (state, {payload}) => {
            const {msg, isChat} = payload

            state.isLoading = false
            if(!state.chats.find(item => item._id === isChat._id)) {
                state.chats = [...state.chats, isChat]
            }
          })
          .addCase(thunk_Fetch_All_Chats.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_All_Chats.fulfilled, (state, {payload}) => {
            const {msg, all_Chats} = payload

            state.isLoading = false
            state.chats = all_Chats
          })
          .addCase(thunk_Fetch_All_Messages.pending, (state) => {
            state.fetchMessageLoading = true
          })
          .addCase(thunk_Fetch_All_Messages.fulfilled, (state, {payload}) => {
            const {msg, messages} = payload

            state.fetchMessageLoading = false
            state.currentChat = messages
          })
          .addCase(thunk_New_Message.pending, (state) => {
            state.newMessageLoading = true
          })
          .addCase(thunk_New_Message.fulfilled, (state, {payload}) => {
            const {msg, message} = payload

            state.newMessageLoading = false
            state.newMessageSuccess = true
            state.new_Message_Info = message
            state.currentChat = [...state.currentChat, message]
          })
    }
})



export const {
  reset_Current_Chat,
  add_New_Message,
  selected_Chat_Info,
  reset_New_Message,
} = chatSlice.actions;



export default chatSlice.reducer