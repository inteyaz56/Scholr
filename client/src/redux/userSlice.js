import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    active: "",
  },

  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setActive(state, action) {
      state.active = action.payload;
    },
  },
});

export const { setUserData, setActive } = userSlice.actions;
export default userSlice.reducer;
