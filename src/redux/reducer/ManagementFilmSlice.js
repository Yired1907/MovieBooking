import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Await } from "react-router-dom";
import requestMovie from "../../services/servicesReques";
import repuestMovie from "../../services/servicesReques";
import { ACCESS_TOKEN, DOMAIN, groupId } from "../../util/setting/config";
import { openCustomNotificationWithIcon } from "../../util/setting/nontification";
import { displayLoading, hiddenLoading } from "./LoadingSlice";

const initialState = {
  listFilm: [],
  listFilmDefault: [],
  dangChieu: true,
  sapChieu: true,
  filmEdit: {},
};

export const ManagementFilmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    setPhimSapChieu: (state, action) => {
      // state.sapChieu = !state.sapChieu;
      state.listFilm = state.listFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
    },
    setPhimDangChieu: (state, action) => {
      // state.dangChieu = !state.dangChieu;
      state.listFilm = state.listFilmDefault.filter(
        (film) => film.dangChieu === state.sapChieu
      );
    },
    setAllFilm: (state, action) => {
      state.listFilm = state.listFilmDefault;
    },
  },
  extraReducers: (builder) => {
    // get list film
    builder.addCase(getListFilm.fulfilled, (state, action) => {
      state.isLoading = false;

      const { content } = action.payload;
      state.listFilm = content;
      state.listFilmDefault = content;
    });
    builder.addCase(getListFilm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListFilm.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
    // upload film
    builder.addCase(uploadFilm.fulfilled, (state, action) => {
      console.log("action", action);
    });
    // get data edit page film
    builder.addCase(getEditFilm.fulfilled, (state, action) => {
      const { content } = action.payload;
      state.filmEdit = content;
    });
    //Edit upload film
    builder.addCase(editUploadFilm.fulfilled, (state, action) => {
      if (action.payload.response.status) {
        openCustomNotificationWithIcon(
          "error",
          "Sửa phim thất bại",
          "Vui lòng sửa với quyền quản trị",
          "topRight"
        );
      }
    });
    //Delete Film
    builder.addCase(deleteFilm.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

// getListFilm

export const getListFilm = createAsyncThunk(
  "film/getListFilm",
  async (tenPhim = "") => {
    try {
      if (tenPhim !== "") {
        const { data } = await requestMovie.get(
          `QuanLyPhim/LayDanhSachPhim?maNhom=${groupId}&tenPhim=${tenPhim}`
        );
        return data;
      } else {
        const { data } = await requestMovie.get(
          `QuanLyPhim/LayDanhSachPhim?maNhom=${groupId}`
        );
        return data;
      }
    } catch (err) {
      console.log("err", err);
    }
  }
);
// add Film with img
export const uploadFilm = createAsyncThunk(
  "film/uploadFilm",
  async (formData, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post(
        "QuanLyPhim/ThemPhimUploadHinh",
        formData
      );
      // console.log(data);
      openCustomNotificationWithIcon(
        "success",
        "Thêm phim thành công",
        "",
        "topRight"
      );
      dispatch(getListFilm());
      dispatch(hiddenLoading());

      return data;
    } catch (err) {
      dispatch(hiddenLoading());
      openCustomNotificationWithIcon(
        "error",
        "Thêm phim thất bại",
        "",
        "topRight"
      );
      console.log("err", err);
      return err;
    }
  }
);
//get data detail film from edit page admin
export const getEditFilm = createAsyncThunk(
  "film/editFilm",
  async (id, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.get(
        `QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
      );
      // console.log(data);

      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      dispatch(hiddenLoading());

      console.log("err", err);
      return err;
    }
  }
);
//edit upload film from edit page
export const editUploadFilm = createAsyncThunk(
  "film/editUploadFilm",
  async (formData, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post(
        `QuanLyPhim/CapNhatPhimUpload`,
        formData
      );
      // console.log(data);
      openCustomNotificationWithIcon(
        "success",
        "Edit phim thành công",
        "",
        "topRight"
      );
      dispatch(getListFilm());
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      dispatch(hiddenLoading());

      console.log("err", err);
      return err;
    }
  }
);
//Delete film fromm edit page
export const deleteFilm = createAsyncThunk(
  "film/deleteFilm",
  async (maPhim, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.delete(
        `QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
      );
      openCustomNotificationWithIcon(
        "success",
        "Xóa phim thành công",
        "",
        "topRight"
      );
      dispatch(getListFilm());
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      dispatch(hiddenLoading());
      openCustomNotificationWithIcon(
        "error",
        "Xóa phim thất bại",
        "Vui lòng xóa với quyền quản trị",
        "topRight"
      );
      console.log("err", err);
      return err;
    }
  }
);
export const { setPhimSapChieu, setPhimDangChieu, setAllFilm } =
  ManagementFilmSlice.actions;

export default ManagementFilmSlice.reducer;
