import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetch_All_Chats_Service, fetch_All_Messages_Service, new_Message_Service, search_Chat_Service } from "../../services/chatService";



export const thunk_Search_Chat = createAsyncThunk(
    'chat/search-chat', async (userId, thunkAPI) => {
        try {
            return await search_Chat_Service(userId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_All_Chats = createAsyncThunk(
    'chat/all-chats', async (thunkAPI) => {
        try {
            return await fetch_All_Chats_Service()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_All_Messages = createAsyncThunk(
    'chat/all-messages', async (chatId, thunkAPI) => {
        try {
            return await fetch_All_Messages_Service(chatId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_New_Message = createAsyncThunk(
    'chat/new-message', async (info, thunkAPI) => {
        try {
            return await new_Message_Service(info)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)