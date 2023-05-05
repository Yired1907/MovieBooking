import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { connection } from "../..";
import { InfoBookTiket } from "../../core/modal/InfoBookTicket";
import requestMovie from "../../services/servicesReques";
import { openCustomNotificationWithIcon } from "../../util/setting/nontification";
import { displayLoading, hiddenLoading } from "./LoadingSlice";

const initialState = {
  reloadPage: false,
  isLoading: false,
  errorMessage: "",
  infoRoom: {},
  listTicket: [],
  listOtherUserBooking: [{ maGhe: 47401 }, { maGhe: 47402 }],
  ActiveTabs: "1",
};

export const ManagementBookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateTicket: (state, action) => {
      // let listTicketUpdate = [...state.listTicket];
      let index = state.listTicket.findIndex(
        (ghe) => ghe.maGhe === action.payload.maGhe
      );
      if (index !== -1) {
        state.listTicket = state.listTicket.filter(
          (ghe) => ghe.maGhe !== action.payload.maGhe
        );
      } else {
        state.listTicket.push(action.payload);
      }
    },
    activeTabs: (state, action) => {
      state.ActiveTabs = action.key;
    },
    updateRealTime: (state, action) => {
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfoRoom.fulfilled, (state, action) => {
      const { content, statusCode } = action.payload;
      state.infoRoom = content;
    });
    //booking ticket api
    builder.addCase(bookingTicket.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        openCustomNotificationWithIcon(
          "success",
          "Đặt vé thành công",
          "",
          "topRight"
        );
        state.ActiveTabs = "2";
      }
      console.log(action);
    });
    builder.addCase(bookingTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      openCustomNotificationWithIcon(
        "error",
        `${state.errorMessage}`,
        "",
        "topRight"
      );
    });
  },
});

// get list room
export const getInfoRoom = createAsyncThunk(
  "booking/getInfoRoom",
  async (idBooking, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.get(
        `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idBooking}`
      );
      dispatch(hiddenLoading());

      return data;
    } catch (err) {
      console.log(err);
      dispatch(hiddenLoading());
      return err;
    }
  }
);

// booking ticket api
export const bookingTicket = createAsyncThunk(
  "booking/bookingTicket",
  async (
    infoBookTiket = new InfoBookTiket(),
    { rejectWithValue, dispatch }
  ) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post(
        "QuanLyDatVe/DatVe",
        infoBookTiket
      );
      await dispatch(getInfoRoom(infoBookTiket.maLichChieu));
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      console.log(err);
      dispatch(hiddenLoading());

      return rejectWithValue(err);
    }
  }
);
// realTime
export const realTimeBooking = createAsyncThunk(
  "booking/realTimeBooking",
  async (payload, { dispatch, getState }) => {
    await dispatch(updateTicket(payload.ghe));
    let maLichChieu = payload.id;
    let { listTicket } = getState().ManagementBookingSlice;
    let { userInfo } = getState().ManagementUserSlice;
    let taiKhoan = JSON.stringify(userInfo);
    let danhSachGheDangDat = JSON.stringify(listTicket);
    await connection.invoke(
      "datGhe",
      taiKhoan,
      danhSachGheDangDat,
      maLichChieu
    );
  }
);
export const { updateTicket, activeTabs, updateRealTime } =
  ManagementBookingSlice.actions;

export default ManagementBookingSlice.reducer;
