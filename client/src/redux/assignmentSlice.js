import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    assignments: [],
    teacherAssignment: [],
    classAssignment: [],
  },

  reducers: {
    setAssignments(state, action) {
      state.assignments = action.payload;
    },
    setTeacherAssignment(state, action) {
      state.teacherAssignment = action.payload;
    },

    setClassAssignments(state, action) {
      state.classAssignment = action.payload;
    },
  },
});

export const {
  setAssignments,
  setTeacherAssignment,
  setClassAssignments,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
