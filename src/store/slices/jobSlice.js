import { createSlice } from "@reduxjs/toolkit"
import { thunk_Apply_To_Job, thunk_Create_Job, thunk_Fetch_All_Jobs, thunk_Fetch_All_Jobs_Applied_To_By_User, thunk_Fetch_All_Jobs_Created_By_User, thunk_Fetch_Single_Job, thunk_Unapply_To_Job } from "../thunks/jobThunk"
import toast from "react-hot-toast"

const initialState = {
    isLoading: false,
    isLoadingApply: false,
    isSuccess: false,
    isError: false,
    jobs: [],
    job: {}
}



export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
      initial_Job_State: (state) => {
        state.isSuccess = false
        state.isError = false
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(thunk_Fetch_All_Jobs.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_All_Jobs.fulfilled, (state, {payload}) => {
            const {msg, all_Jobs} = payload
          
            state.isLoading = false
            state.jobs = all_Jobs
          })
          .addCase(thunk_Fetch_All_Jobs_Created_By_User.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_All_Jobs_Created_By_User.fulfilled, (state, {payload}) => {
            const {msg, user_Created_Jobs} = payload

            state.isLoading = false
            state.jobs = user_Created_Jobs
          })
          .addCase(thunk_Fetch_All_Jobs_Applied_To_By_User.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_All_Jobs_Applied_To_By_User.fulfilled, (state, {payload}) => {
            const {msg, jobsAppliedTo} = payload

            state.isLoading = false
            state.jobs = jobsAppliedTo
          })
          .addCase(thunk_Fetch_Single_Job.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_Single_Job.fulfilled, (state, {payload}) => {
            const {msg, job} = payload

            state.isLoading = false
            state.job = job
          })
          .addCase(thunk_Apply_To_Job.pending, (state) => {
            state.isLoadingApply = true
          })
          .addCase(thunk_Apply_To_Job.fulfilled, (state, {payload}) => {
            const {msg, applicant, jobApplied} = payload

            state.isLoadingApply = false
            state.isSuccess = true
            
            toast.success(msg, {
              duration: 1500,
              position: 'bottom-center'
            })
          })
          .addCase(thunk_Unapply_To_Job.pending, (state) => {
            state.isLoadingApply = true
          })
          .addCase(thunk_Unapply_To_Job.fulfilled, (state, {payload}) => {
            const {msg, applicant, jobApplied} = payload

            state.isLoadingApply = false
            state.isSuccess = true
            
            toast.success(msg, {
              duration: 1500,
              position: 'bottom-center'
            })
          })
          .addCase(thunk_Create_Job.pending, (state) => {
            state.isLoadingApply = true
          })
          .addCase(thunk_Create_Job.fulfilled, (state, {payload}) => {
            const {msg, new_Job} = payload

            state.isLoadingApply = false
            state.isSuccess = true

            toast.success(msg, {
              duration: 1500,
              position: 'bottom-center'
            })
          })
    }
})



export const {initial_Job_State} = jobSlice.actions


export default jobSlice.reducer