import { createSlice } from "@reduxjs/toolkit";

const feesSlice = createSlice({
  name: "fees",
  initialState: {
    totalCollected: 0,
    partialCollected: 0,
    totalDue: 0,
  },

  reducers: {
    setSummary(state, action) {
      state.totalCollected = action.payload.totalCollected;
      state.partialCollected = action.payload.partialCollected;
      state.totalDue = action.payload.totalDue;
    },
  },
});

export const { setSummary } = feesSlice.actions;

export default feesSlice.reducer;
