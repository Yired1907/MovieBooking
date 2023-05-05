import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import requestMovie from "../../services/servicesReques";
import repuestMovie from "../../services/servicesReques";

export const CaurouselSlice = createSlice({
  name: "banner",
  initialState: {
    isLoading: false,
    errorMessage: "",
    currentUser: null,
    arrImg: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      const { content, statusCode } = action.payload;
      state.arrImg = content;
    });
    builder.addCase(getBanner.pending, (state) => {
      state.isLoading = true;
    });
  },
});
// get banner thunk
export const getBanner = createAsyncThunk("banner/GetBanner", async () => {
  const { data } = await requestMovie.get("QuanLyPhim/LayDanhSachBanner/");
  return data;
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  CaurouselSlice.actions;

export default CaurouselSlice.reducer;
