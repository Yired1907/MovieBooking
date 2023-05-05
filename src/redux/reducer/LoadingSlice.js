import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    displayLoading: (state, action) => {
      state.isLoading = true;
    },
    hiddenLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { displayLoading, hiddenLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
