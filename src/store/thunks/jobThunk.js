import { createAsyncThunk } from "@reduxjs/toolkit";
import { apply_To_Job_Service, create_Job_Service, fetch_All_Jobs_Applied_To_By_User_Service, fetch_All_Jobs_Created_By_User_Service, fetch_All_Jobs_Service, fetch_Single_Job_Service, unapply_To_Job_Service } from "../../services/jobService";




export const thunk_Fetch_All_Jobs = createAsyncThunk(
    'job/fetch-all', async (thunkAPI) => {
        try {
            return await fetch_All_Jobs_Service()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_All_Jobs_Created_By_User = createAsyncThunk(
    'job/fetch-user-jobs', async (thunkAPI) => {
        try {
            return await fetch_All_Jobs_Created_By_User_Service()
        } catch (error) {
            return  thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_All_Jobs_Applied_To_By_User = createAsyncThunk(
    'job/applied-to-user-jobs', async (thunkAPI) => {
        try {
            return await fetch_All_Jobs_Applied_To_By_User_Service()
        } catch (error) {
            return  thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Fetch_Single_Job = createAsyncThunk(
    'job/fetch-single-job', async (jobId, thunkAPI) => {
        try {
            return await fetch_Single_Job_Service(jobId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Apply_To_Job = createAsyncThunk(
    'job/apply-to-job', async (jobId, thunkAPI) => {
        try {
            return await apply_To_Job_Service(jobId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Unapply_To_Job = createAsyncThunk(
    'job/unapply-to-job', async (jobId, thunkAPI) => {
        try {
            return await unapply_To_Job_Service(jobId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Create_Job = createAsyncThunk(
    'job/create-job', async (jobInfo, thunkAPI) => {
        try {
            return create_Job_Service(jobInfo)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)