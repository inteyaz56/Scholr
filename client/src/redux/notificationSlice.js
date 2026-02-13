import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unReadCount: 0,
  },

  reducers: {
    setNotification(state, action) {
      state.notifications = action.payload;

      state.unReadCount = action.payload.filter((n) => !n.isRead).length;
    },

    addNotification(state, action) {
      state.notifications.unshift(action.payload);
      state.unReadCount += 1;
    },
  },
});

export const { setNotification, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
