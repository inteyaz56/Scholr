import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
    classSubjects: [],
  },

  reducers: {
    setSubject(state, action) {
      state.subjects = action.payload;
    },
    setClassSubject(state, action) {
      state.classSubjects = action.payload;
    },
  },
});

export const { setSubject, setClassSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
