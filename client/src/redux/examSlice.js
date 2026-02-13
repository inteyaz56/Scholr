import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    examSubject: null,
    classExam: [],
  },

  reducers: {
    setExam(state, action) {
      state.exams = action.payload;
    },

    setExamSubject(state, action) {
      state.examSubject = action.payload;
    },

    setClassExam(state, action) {
      state.classExam = action.payload;
    },
  },
});

export const { setExam, setExamSubject, setClassExam } = examSlice.actions;
export default examSlice.reducer;
