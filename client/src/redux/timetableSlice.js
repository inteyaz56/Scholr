import { createSlice } from "@reduxjs/toolkit";

const timetableSlice = createSlice({
  name: "timetable",
  initialState: {
    timetables: [],
    teacherTimetable: [],
    clasTimeTable: [],
    studentTimetable: [],
  },

  reducers: {
    setTimetables(state, action) {
      state.timetables = action.payload;
    },
    setTeacherTimetable(state, action) {
      state.teacherTimetable = action.payload;
    },
    setClassTimetable(state, action) {
      state.clasTimeTable = action.payload;
    },
    setStudentTimetable(state, action) {
      state.studentTimetable = action.payload;
    },
  },
});

export const {
  setStudentTimetable,
  setClassTimetable,
  setTeacherTimetable,
  setTimetables,
} = timetableSlice.actions;

export default timetableSlice.reducer;
