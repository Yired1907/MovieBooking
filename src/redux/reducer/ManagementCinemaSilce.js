import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestMovie from "../../services/servicesReques";

const initialState = {
  listCinema: [],
  filmDetail: {},
};

export const ManagementInfoCinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    reducerName: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getListInfoCinema.fulfilled, (state, action) => {
      state.listCinema = action.payload.content;
    });
    builder.addCase(getFilmDetail.fulfilled, (state, action) => {
      state.filmDetail = action.payload.content;
    });
  },
});
// get list cinema
export const getListInfoCinema = createAsyncThunk(
  "cinema/getlistCinema",
  async () => {
    const { data } = await requestMovie(
      "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP00"
    );
    return data;
  }
);
// get film detail
export const getFilmDetail = createAsyncThunk(
  "cinema/getFilmDetail",
  async (idFilm) => {
    const { data } = await requestMovie(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`
    );
    return data;
  }
);
export const { reducerName } = ManagementInfoCinemaSlice.actions;

export default ManagementInfoCinemaSlice.reducer;
