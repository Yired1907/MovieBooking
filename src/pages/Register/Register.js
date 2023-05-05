import { useFormik } from "formik";
import React from "react";
import cinema from "../../asset/LogoCinema/cinema.png";
import * as Yup from "yup";
import { min } from "lodash";
import { groupId } from "../../util/setting/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/reducer/ManagementUserSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: groupId,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string("Require"),
      hoTen: Yup.string("Require"),
      soDt: Yup.number("Require").min(10, "phone reqire minimum 10 number"),
      email: Yup.string("Require").email("email invalid"),
      matKhau: Yup.string()
        .min(6, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(registerUser(values));
      navigate("/login/sign-in");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="px-4 md:px-0 lg:w-6/12 ">
      <div className="md:mx-6 md:p-12">
        <div className="text-center ">
          <img className="mx-auto w-48" src={cinema} alt="logo" />
          <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">
            Vui lòng đăng ký để tiếp tục
          </h4>
        </div>
        <div className="relative mb-4" data-te-input-wrapper-init>
          <strong>Họ tên:</strong>
          <input
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
            className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="hoTen"
            id="hoTen"
            placeholder="Name"
          />
          {formik.errors.hoTen && formik.touched.hoTen && (
            <p className="text-red-500">{formik.errors.hoTen}</p>
          )}
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
        <div className="relative mb-4" data-te-input-wrapper-init>
          <strong>Email:</strong>
          <input
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            id="email"
            placeholder="Email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="relative mb-4" data-te-input-wrapper-init>
          <strong>Số điện thoại:</strong>
          <input
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.soDt}
            className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="soDt"
            id="soDt"
            placeholder="Phone"
          />
          {formik.errors.soDt && formik.touched.soDt && (
            <p className="text-red-500">{formik.errors.soDt}</p>
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
            Đăng ký
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
