import axios from "axios"



export const fetch_All_Jobs_Service = async () => {
    const {data} = await axios.get(
        `/api/job/fetch-all-jobs`
    )

    return data
}



export const fetch_All_Jobs_Created_By_User_Service = async () => {
    const {data} = await axios.get(
        `/api/job/jobs-created-user`
    )

    return data
}



export const fetch_All_Jobs_Applied_To_By_User_Service = async () => {
    const {data} = await axios.get(
        `/api/job/jobs-applied-to-user`
    )

    return data
}



export const fetch_Single_Job_Service = async (jobId) => {
    const {data} = await axios.get(
        `/api/job/fetch-single-job/${jobId}`
    )

    return data
}



export const apply_To_Job_Service = async (jobId) => {
    const {data} = await axios.post(
        `/api/job/apply-job/${jobId}`
    )

    return data
}



export const unapply_To_Job_Service = async (jobId) => {
    const {data} = await axios.post(
        `/api/job/unapply-job/${jobId}`
    )

    return data
}



export const create_Job_Service = async (jobInfo) => {
    const {data} = await axios.post(
        `/api/job/create-job`,
        jobInfo
    )

    return data
}