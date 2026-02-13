import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "class",
  initialState: {
    classData: null,
    myClass: null,
  },

  reducers: {
    setClass(state, action) {
      state.classData = action.payload;
    },

    setMyClass(state, action) {
      state.myClass = action.payload;
    },
  },
});

export const { setClass, setMyClass } = classSlice.actions;
export default classSlice.reducer;
