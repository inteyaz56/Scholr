import { createSlice } from "@reduxjs/toolkit";

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    notices: [],
    myNotice: [],
  },

  reducers: {
    setNotice(state, action) {
      state.notices = action.payload;
    },
    setMyNotices(state, action) {
      state.myNotice = action.payload;
    },
  },
});

export const { setNotice, setMyNotices } = noticeSlice.actions;
export default noticeSlice.reducer;
