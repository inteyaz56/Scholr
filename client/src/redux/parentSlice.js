import { createSlice } from "@reduxjs/toolkit";

const parentSlice = createSlice({
  name: "parent",
  initialState: {
    parentData: null,
    myChild: [],
  },

  reducers: {
    setParent(state, action) {
      state.parentData = action.payload;
    },

    setMyChild(state, action) {
      state.myChild = action.payload;
    },
  },
});

export const { setParent, setMyChild } = parentSlice.actions;

export default parentSlice.reducer;
