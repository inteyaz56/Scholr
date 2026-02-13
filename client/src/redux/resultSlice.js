import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    myResult: null,
  },

  reducers: {
    setMyResult(state, action) {
      state.myResult = action.payload;
    },
  },
});

export const { setMyResult } = resultSlice.actions;
export default resultSlice.reducer;
