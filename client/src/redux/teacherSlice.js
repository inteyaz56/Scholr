import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherData: [],
    teacherAssignment: [],
    myClasses: [],
  },

  reducers: {
    setTeacherData(state, action) {
      state.teacherData = action.payload;
    },
    setTeacherAssignment(state, action) {
      state.teacherAssignment = action.payload;
    },
    setMyClasses(state, action) {
      state.myClasses = action.payload;
    },
  },
});

export const {
  setTeacherData,
  setTeacherAssignment,
  setMyClasses,
} = teacherSlice.actions;
export default teacherSlice.reducer;
