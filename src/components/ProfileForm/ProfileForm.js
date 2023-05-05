import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { groupId, USER_INFO } from "../../util/setting/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getInfoUserUpdate,
  getTypeUser,
  updateUser,
  updateUserAdmin,
} from "../../redux/reducer/ManagementUserSlice";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
function ProfileForm(props) {
  const dispatch = useDispatch();
  let { infoUserUpdate, onClose } = props;
  const { maLoaiNguoiDung } = JSON.parse(localStorage.getItem(USER_INFO));
  const userUpdateAdmin = JSON.parse(localStorage.getItem("USER_UPDATE"));
  const { typeUser } = useSelector((state) => state.ManagementUserSlice);
  console.log(userUpdateAdmin);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: infoUserUpdate.email,
      hoTen: infoUserUpdate.hoTen,
      maLoaiNguoiDung: userUpdateAdmin
        ? userUpdateAdmin.maLoaiNguoiDung
        : maLoaiNguoiDung,
      maNhom: groupId,
      matKhau: infoUserUpdate.matKhau,
      soDt: userUpdateAdmin ? userUpdateAdmin.soDt : infoUserUpdate.soDT,
      taiKhoan: infoUserUpdate.taiKhoan,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      hoTen: Yup.string().required("Họ tên là bắt buộc"),
      soDt: Yup.number().integer().required("Số điện thoại là bắt buộc"),
      taiKhoan: Yup.string().required("Tài khoản là bắt buộc"),
      matKhau: Yup.string().required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log(userUpdateAdmin);
      //kiểm tra quyền user để sửa và thêm user
      {
        userUpdateAdmin !== "addNew"
          ? maLoaiNguoiDung === "KhachHang"
            ? dispatch(updateUser(values))
            : dispatch(updateUserAdmin(values))
          : dispatch(addUser(values));
      }

      console.log(values);
    },
  });
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  const options = typeUser.map((item, idx) => ({
    label: item.tenLoai,
    value: item.maLoaiNguoiDung,
  }));
  useEffect(() => {
    dispatch(getInfoUserUpdate());
    dispatch(getTypeUser());
  }, []);
  return (
    <>
      {" "}
      {userUpdateAdmin === "addNew" ? (
        <p className="text-3xl font-bold text-center mb-6 text-black">
          Thêm mới người dùng
        </p>
      ) : (
        <p className="text-3xl font-bold text-center mb-6 text-black">
          Chỉnh sửa thông tin tài khoản
        </p>
      )}
      <Form
        size="large"
        className="mx-auto"
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
        layout="horizontal"
      >
        {" "}
        <div className=" flex-wrap sm:flex   justify-center">
          <div className="">
            <Form.Item label="Email">
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                id="email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </Form.Item>{" "}
            <Form.Item label="Họ tên">
              <Input
                value={formik.values.hoTen}
                onChange={formik.handleChange}
                name="hoTen"
              />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className="text-red-600">{formik.errors.hoTen}</p>
              )}
            </Form.Item>{" "}
            <Form.Item label="Số điện thoại">
              <Input
                value={formik.values.soDt}
                onChange={formik.handleChange}
                name="soDt"
              />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className="text-red-600">{formik.errors.soDt}</p>
              )}
            </Form.Item>
          </div>
          <div className="">
            <Form.Item label="Tài khoản ">
              <Input
                disabled={userUpdateAdmin === "addNew" ? false : true}
                value={formik.values.taiKhoan}
                onChange={formik.handleChange}
                name="taiKhoan"
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className="text-red-600">{formik.errors.taiKhoan}</p>
              )}
            </Form.Item>

            <Form.Item label="Mật khẩu">
              <Input.Password
                value={formik.values.matKhau}
                onChange={formik.handleChange}
                name="matKhau"
              />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className="text-red-600">{formik.errors.matKhau}</p>
              )}
            </Form.Item>
          </div>
          {userUpdateAdmin ? (
            <div className="flex w-full justify-center items-center mb-6">
              <p className="mr-4">Loại tài khoản:</p>
              <Select
                className=""
                // defaultValue="lucy"
                // labelInValue={userUpdateAdmin.maLoaiNguoiDung}
                defaultValue={userUpdateAdmin.maLoaiNguoiDung}
                style={{
                  width: 150,
                }}
                onChange={handleChange}
                options={options}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <Form.Item className="mx-auto w-full flex justify-center">
          {userUpdateAdmin === "addNew" ? (
            <Button
              // onClick={onClose}
              type="primary"
              className="bg-blue-500 "
              htmlType="submit"
            >
              Thêm mới
            </Button>
          ) : (
            <Button
              // onClick={onClose}
              type="primary"
              className="bg-blue-500 "
              htmlType="submit"
            >
              Cập nhật
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default ProfileForm;
