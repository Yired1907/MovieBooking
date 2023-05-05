import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { upload } from "@testing-library/user-event/dist/upload";
import {
  addFilm,
  uploadFilm,
} from "../../../redux/reducer/ManagementFilmSlice";
import { groupId } from "../../../util/setting/config";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
function AddNew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: groupId,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      console.log(values);
      dispatch(uploadFilm(formData));
      navigate("/admin/film");
    },
  });
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeUpload = async (e) => {
    let file = e.target.files[0];
    await formik.setFieldValue("hinhAnh", file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };
  return (
    <>
      <h1 className="text-4xl text-center font-bold my-4">Thêm Phim</h1>
      <Form
        size="large"
        className="w-full mx-auto"
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Tên Phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            name="ngayKhoiChieu"
            onChange={(e) => {
              let ngayKhoiChieu = dayjs(e).format("DD/MM/YYYY");
              formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
            }}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch className="" onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch className="" onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch className="" onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleChangeNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        {/* <Form.Item label="Hình ảnh">
          <input type="file"></input>
        </Form.Item> */}
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <input
            accept="image/png, image/jpeg"
            type="file"
            name="hinhAnh"
            onChange={handleChangeUpload}
          />
          <img className=" mt-2" src={imgSrc} alt="..." />
        </Form.Item>
        <div className="text-center w-full">
          <button
            type="submit"
            className="bg-blue-500  text-white py-2 px-4 mt-8 hover:scale-110 transition-all rounded-md"
          >
            Thêm phim
          </button>
        </div>
      </Form>
    </>
  );
}

export default AddNew;
