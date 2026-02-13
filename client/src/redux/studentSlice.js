import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: null,
    studentData: null,
    result: null,
    classStudent: [],
    myData: null,
  },

  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
    },

    setStudentData(state, action) {
      state.studentData = action.payload;
    },

    setResult(state, action) {
      state.result = action.payload;
    },

    setClassStudent(state, action) {
      state.classStudent = action.payload;
    },

    setMyData(state, action) {
      state.myData = action.payload;
    },
  },
});

export const {
  setStudents,
  setStudentData,
  setResult,
  setMyData,
  setClassStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
