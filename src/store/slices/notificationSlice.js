import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications: []
}



export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    add_New_Notification: (state, { payload }) => {
      state.notifications = [...state.notifications, payload];
    },
    delete_Notification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (item) =>
          item.post_Id !== payload.postId ||
          (item.post_Id === payload.postId && item.type !== payload.type)
      );
    },
    delete_Follow_Notification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (item) =>
          item.type !== "follow" ||
          !(
            item.type === "follow" && item.logged_In_User.id === payload.user_Id
          )
      );
    },
    delete_Job_Notification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (item) =>
          item.type !== "job" ||
          !(
            item.type === "job" &&
            item.logged_In_User.id === payload.user_Id &&
            item.job_Applied_Id === payload.job_Id
          )
      );
    },
    clear_All_Notifications: (state) => {
      state.notifications = [];
    },
  },
});



export const {
  add_New_Notification,
  clear_All_Notifications,
  delete_Notification,
  delete_Follow_Notification,
  delete_Job_Notification
} = notificationSlice.actions;



export default notificationSlice.reducer