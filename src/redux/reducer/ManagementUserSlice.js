import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestMovie from "../../services/servicesReques";
import { ACCESS_TOKEN, groupId, USER_INFO } from "../../util/setting/config";
import { history } from "../../App";
import { redirect } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../util/setting/nontification";
import { displayLoading, hiddenLoading } from "./LoadingSlice";
import { historyUserBookTickets } from "../../core/modal/InfoBookTicket";
let infoUser = "";
if (localStorage.getItem(USER_INFO)) {
  infoUser = JSON.parse(localStorage.getItem(USER_INFO));
}
const initialState = {
  userInfo: infoUser,
  login: false,
  historyUserBookTicket: {},
  infoUserUpdate: {},
  listUser: [],
  typeUser: [],
};

export const ManagementUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.login = false;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_INFO);
      localStorage.removeItem("USER_UPDATE");
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        openCustomNotificationWithIcon(
          "success",
          "Đăng xuất thành công",
          "",
          "topRight"
        );
      }
      // history.push("/");
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { content, statusCode } = action.payload;
      if (statusCode === 200) {
        state.userInfo = content;
        localStorage.setItem(ACCESS_TOKEN, state.userInfo.accessToken);
        localStorage.setItem(USER_INFO, JSON.stringify(state.userInfo));
        state.login = true;
      }
    });

    // history user booking ticket
    builder.addCase(getHistoryUserBookTicket.fulfilled, (state, action) => {
      const { content, statusCode } = action.payload;
      state.historyUserBookTicket = content;
    });
    // register user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action);
    });
    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action);
    });
    //update user admin
    builder.addCase(updateUserAdmin.fulfilled, (state, action) => {
      console.log(action);
    });
    // get info user to update user page
    builder.addCase(getInfoUserUpdate.fulfilled, (state, action) => {
      state.infoUserUpdate = action.payload.content;
    });
    //get list user
    builder.addCase(getListUser.fulfilled, (state, action) => {
      state.listUser = action.payload.content;
    });
    //get type user
    builder.addCase(getTypeUser.fulfilled, (state, action) => {
      state.typeUser = action.payload.content;
    });
    //add new user
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log(action);
    });
    //deleteuser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

// login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post(
        "QuanLyNguoiDung/DangNhap",
        user
      );
      openCustomNotificationWithIcon(
        "success",
        "Đăng nhập thành công",
        "",
        "topRight"
      );
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      console.log(err);
      openCustomNotificationWithIcon(
        "error",
        "Đăng nhập thất bại",
        "Sai tài khoản hoặc mật khẩu",
        "topRight"
      );
      dispatch(hiddenLoading());

      return err;
    }
  }
);
//register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post("QuanLyNguoiDung/DangKy", user);
      openCustomNotificationWithIcon(
        "success",
        "Đăng ký thành công",
        "",
        "topRight"
      );
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      console.log(err);
      openCustomNotificationWithIcon("error", "Đăng ký thất bại", "topRight");
      dispatch(hiddenLoading());

      return err;
    }
  }
);
//update user admin
export const updateUserAdmin = createAsyncThunk(
  "user/updateUserAdmin",
  async (user, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.post(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );
      openCustomNotificationWithIcon(
        "success",
        "Cập nhật thông tin thành công",
        "",
        "topRight"
      );
      dispatch(getListUser());
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      console.log(err.response.status);
      dispatch(hiddenLoading());
      if (err.response.status === 403) {
        openCustomNotificationWithIcon(
          "error",
          "Cập nhật thông tin thất bại",
          `Tài khoản của bạn không có quyền sửa người dùng`,
          "topRight"
        );
      } else {
        openCustomNotificationWithIcon(
          "error",
          "Cập nhật thông tin thất bại",
          "",
          "topRight"
        );
      }

      return err;
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, { dispatch }) => {
    dispatch(displayLoading());
    try {
      const { data } = await requestMovie.put(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );
      openCustomNotificationWithIcon(
        "success",
        "Cập nhật thông tin thành công",
        "",
        "topRight"
      );
      dispatch(getListUser());
      dispatch(hiddenLoading());
      return data;
    } catch (err) {
      console.log(err.response.status);
      dispatch(hiddenLoading());
      if (err.response.status === 403) {
        openCustomNotificationWithIcon(
          "error",
          "Cập nhật thông tin thất bại",
          `Tài khoản của bạn không có quyền sửa người dùng`,
          "topRight"
        );
      } else {
        openCustomNotificationWithIcon(
          "error",
          "Cập nhật thông tin thất bại",
          "",
          "topRight"
        );
      }

      return err;
    }
  }
);
//get history user booking ticket
export const getHistoryUserBookTicket = createAsyncThunk(
  "user/getHistoryBookTicket",
  async () => {
    const { data } = await requestMovie.post(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
    return data;
  }
);
// get info user to update user page
export const getInfoUserUpdate = createAsyncThunk(
  "user/getInfoUserUpdate",
  async () => {
    const { data } = await requestMovie.post(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
    return data;
  }
);
//get list user
export const getListUser = createAsyncThunk(
  "user/getListUser",
  async (name = "") => {
    try {
      if (name === "") {
        const { data } = await requestMovie.get(
          `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupId}`
        );
        return data;
      } else {
        const { data } = await requestMovie.get(
          `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupId}&tuKhoa=${name}`
        );
        return data;
      }
    } catch (err) {
      console.log("err", err);
      return err;
    }
  }
);
//get type user
export const getTypeUser = createAsyncThunk("user/getTypeUser", async () => {
  try {
    const { data } = await requestMovie.get(
      `QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`
    );
    return data;
  } catch (err) {
    console.log("err", err);
    return err;
  }
});
// add new user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, { dispatch }) => {
    dispatch(displayLoading());

    try {
      const { data } = await requestMovie.post(
        `QuanLyNguoiDung/ThemNguoiDung`,
        user
      );
      openCustomNotificationWithIcon(
        "success",
        "Thêm người dùng thành công",
        "",
        "topRight"
      );
      dispatch(hiddenLoading());
      dispatch(getListUser());

      return data;
    } catch (err) {
      dispatch(hiddenLoading());
      openCustomNotificationWithIcon(
        "error",
        "Thêm người dùng thất bại",
        "",
        "topRight"
      );
      console.log("err", err);
      return err;
    }
  }
);
//delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (name, { dispatch }) => {
    dispatch(displayLoading());

    try {
      const { data } = await requestMovie.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${name}`
      );
      openCustomNotificationWithIcon(
        "success",
        "Xóa người dùng thành công",
        "",
        "topRight"
      );
      dispatch(hiddenLoading());
      dispatch(getListUser());

      return data;
    } catch (err) {
      dispatch(hiddenLoading());
      if (err.response.status === 403) {
        openCustomNotificationWithIcon(
          "error",
          "Xóa người dùng dùng thất bại",
          `Tài khoản của bạn không có quyền xóa người dùng`,
          "topRight"
        );
      } else {
        openCustomNotificationWithIcon(
          "error",
          "Xóa người dùng dùng thất bại",
          `${err.response.data.content}`,
          "topRight"
        );
      }

      console.log("err", err.response.data.content);
      return err;
    }
  }
);

export const { logOut } = ManagementUserSlice.actions;

export default ManagementUserSlice.reducer;
