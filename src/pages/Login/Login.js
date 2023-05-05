import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/reducer/ManagementUserSlice";
import { history } from "../../App";
import { redirect, useNavigate } from "react-router-dom";
import { USER_INFO } from "../../util/setting/config";
import { Alert } from "antd";
import cinema from "../../asset/LogoCinema/cinema.png";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.ManagementUserSlice);
  // formik
  const formik = useFormik({
    initialValues: {
      taiKhoan: "01Admin123",
      matKhau: "admin123",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string("Require"),
      matKhau: Yup.string()
        .min(6, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (localStorage.getItem(USER_INFO)) {
      return navigate("/");
    }
  }, [login]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="px-4 md:px-0 mt-[3%] lg:w-6/12"
    >
      <div className="md:mx-6 md:p-12">
        <div className="text-center">
          <img className="mx-auto w-48" src={cinema} alt="logo" />
          <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">
            Vui lòng đăng nhập để tiếp tục
          </h4>
        </div>
        <div className="relative mb-4" data-te-input-wrapper-init>
          <strong className="">Tài khoản:</strong>

          <input
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
            type="text"
            className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taiKhoan"
            name="taiKhoan"
            placeholder="Username"
          />

          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          )}
        </div>
        <div className="relative mb-4" data-te-input-wrapper-init>
          <strong>Mật khẩu:</strong>
          <input
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
            type="password"
            className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="matKhau"
            id="matKhau"
            placeholder="Password"
          />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          )}
        </div>
        <div className="mb-12 pt-1 pb-1 text-center">
          <button
            className="mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            data-te-ripple-init
            data-te-ripple-color="light"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            Đăng nhập
          </button>
          <a href="#!">Forgot password?</a>
        </div>
        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Bạn không có tài khoản ?</p>
          <button
            onClick={() => {
              navigate("/login/sign-up");
            }}
            type="button"
            className="inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
