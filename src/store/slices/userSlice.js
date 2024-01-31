import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetch_Saved_Posts_Service, fetch_User_By_Name_Service, follow_Unfollow_User_Service, logged_In_User_Info_Service, loginUserService, logout_User_Service, register_User_Service, remove_Saved_Post, save_Post_Service, update_User_Info_Service, user_Details_By_Id_Service } from "../../services/userService"
import toast from "react-hot-toast"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    currentUser: null,
    userDetails: {},
    savedPosts: [],
    applicationEntryType: '',
    socketFlag: false
}



// Register User
export const thunk_Register_User = createAsyncThunk(
    'user/register', async (userData, thunkAPI) => {
        try {
            return await register_User_Service(userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



// Login user
export const thunkLoginUser = createAsyncThunk(
    'user/login', async (userData, thunkAPI) => {
        try {
            return await loginUserService(userData)
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)


// Fetch user details by username
export const thunk_User_Details_By_Name = createAsyncThunk(
    'user/username', async (username, thunkAPI) => {
        try {
            return await fetch_User_By_Name_Service(username)
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)



// Follow-Unfollow user
export const thunk_Follow_Unfollow = createAsyncThunk(
    'user/follow', async (userId, thunkAPI) => {
        try {
            return await follow_Unfollow_User_Service(userId)
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)



export const thunk_Update_User = createAsyncThunk(
    'user/update-info', async (userInfo, thunkAPI) => {
        try {
            return await update_User_Info_Service(userInfo)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Logout_User = createAsyncThunk(
    'user/logout', async (thunkAPI) => {
        try {
            return await logout_User_Service()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Save_Post = createAsyncThunk(
    'user/save-post', async (postId, thunkAPI) => {
        try {
            return await save_Post_Service(postId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Logged_In_User_Info = createAsyncThunk(
    'user/logged-in-user-info', async (thunkAPI) => {
        try {
            return await logged_In_User_Info_Service()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_User_Details_By_Id = createAsyncThunk(
    'user/details-id', async (userId, thunkAPI) => {
        try {
            return await user_Details_By_Id_Service(userId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_Saved_Posts = createAsyncThunk(
    'user/saved-post', async (thunkAPI) => {
        try {
            return await fetch_Saved_Posts_Service()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Remove_Saved_Post = createAsyncThunk(
    'user/remove-saved-post', async (postId, thunkAPI) => {
        try {
            return await remove_Saved_Post(postId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initial_User_State: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
        inobx_Initial_User_State: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.userDetails = {}
        },
        set_Google_User: (state, {payload}) => {
            state.currentUser = payload
        },
        set_Application_Entry_Type: (state, {payload}) => {
            state.applicationEntryType = payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(thunk_Register_User.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Register_User.fulfilled, (state, {payload}) => {
            const {msg, userDetails} = payload

            state.isLoading = false
            state.isSuccess = true
            state.isError = false

            toast.success(msg, {
                duration: 1500,
                position: 'bottom-center'
            })
          })
          .addCase(thunk_Register_User.rejected, (state, {payload}) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

            toast.error(payload, {
                duration: 1500,
                position: 'bottom-center'
            })
          })
          .addCase(thunkLoginUser.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
          })
          .addCase(thunkLoginUser.fulfilled, (state, {payload}) => {
            const {msg, userDetails} = payload

            state.currentUser = userDetails
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.socketFlag = true

            toast.success(msg, {
                duration: 1500,
                position: "bottom-center"
            })
          })
          .addCase(thunkLoginUser.rejected, (state, {payload}) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

            toast.error(payload, {
                duration:1500,
                position: "bottom-center"
            })
          })
          .addCase(thunk_User_Details_By_Name.pending, (state, {payload}) => {
            state.isLoading = true  
          })
          .addCase(thunk_User_Details_By_Name.fulfilled, (state, {payload}) => {
            const {msg, user} = payload

            state.isLoading = false
            state.userDetails = user
          })
          .addCase(thunk_Follow_Unfollow.fulfilled, (state, {payload}) => {
            const {msg, logged_In_User} = payload
            
            state.isSuccess = true
            state.currentUser = logged_In_User

            toast.success(msg, {
                duration: 1200
            })
          })
          .addCase(thunk_Update_User.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Update_User.fulfilled, (state, {payload}) => {
            const {msg, updatedUser} = payload

            state.isLoading = false
            state.isSuccess = true
            state.userDetails = updatedUser
            state.currentUser = updatedUser

            toast.success(msg, {
                duration: 1500,
                position: "bottom-center"
            })
          })
          .addCase(thunk_Logout_User.fulfilled, (state, {payload}) => {
            const {msg} = payload

            state.isSuccess = true
            state.currentUser = null
            state.userDetails = {}
            state.socketFlag = false

            toast.success(msg, {
                duration: 1500,
                position: 'bottom-center'
            })
          })
          .addCase(thunk_Save_Post.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Save_Post.fulfilled, (state, {payload}) => {
            const {msg, loggedInUser} = payload

            state.isLoading = false
            state.currentUser.saved = loggedInUser.saved

            toast.success(msg, {
                duration: 1500,
                position: 'bottom-center'
            })
          })
          .addCase(thunk_Logged_In_User_Info.fulfilled, (state, {payload}) => {
            const {msg, logged_In_User} = payload

            state.currentUser = logged_In_User
          })
          .addCase(thunk_User_Details_By_Id.fulfilled, (state, {payload}) => {
            const {msg, user} = payload

            state.userDetails = user
          })
          .addCase(thunk_Fetch_Saved_Posts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_Saved_Posts.fulfilled, (state, {payload}) => {
            const {msg, loggedInUser} = payload

            state.isLoading = false
            state.savedPosts = loggedInUser.saved
          })
          .addCase(thunk_Remove_Saved_Post.fulfilled, (state, {payload}) => {
            const {msg, logged_In_User} = payload

            state.isSuccess = true
            state.currentUser.saved = logged_In_User.saved

            toast.success(msg, {
                duration: 1500,
                position: 'bottom-center'
            })
          })
    }
})



export const {initial_User_State, inobx_Initial_User_State, set_Google_User, set_Application_Entry_Type} = userSlice.actions


export default userSlice.reducer