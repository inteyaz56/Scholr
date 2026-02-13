import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    myAttendance: null,
  },

  reducers: {
    setMyAttendance(state, action) {
      state.myAttendance = action.payload;
    },
  },
});

export const { setMyAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
