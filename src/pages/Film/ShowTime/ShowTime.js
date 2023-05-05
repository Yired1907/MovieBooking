import React, { useEffect } from "react";
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
import requestMovie from "../../../services/servicesReques";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import CardFilm from "../../../components/CardFilm/CardFilm";
import { openCustomNotificationWithIcon } from "../../../util/setting/nontification";
function ShowTime() {
  const { id, tenPhim } = useParams();
  const [state, setState] = useState({
    infoListCinema: [],
    infoDetailCinema: [],
  });
  // get film detail from localstrong
  let film = {};
  if (localStorage.getItem("filmDetail")) {
    film = JSON.parse(localStorage.getItem("filmDetail"));
  }
  console.log(film);
  // formik validate
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const { data } = await requestMovie.post(
          `QuanLyDatVe/TaoLichChieu`,
          values
        );
        openCustomNotificationWithIcon(
          "success",
          "Tạo lịch chiếu phim thành công",
          "",
          "topRight"
        );
        console.log(data);
      } catch (error) {
        console.log("err", error);
        openCustomNotificationWithIcon(
          "error",
          "Tạo lịch chiếu phim thất bại",
          "",
          "topRight"
        );
      }
    },
  });
  const optionsInfoListCinema = state.infoListCinema?.map((item, idx) => ({
    value: item.maHeThongRap,
    label: item.tenHeThongRap,
  }));

  const onChangeInfoListCinema = async (maHeThongRap, option) => {
    try {
      const { data } = await requestMovie.get(
        `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      setState({
        ...state,
        infoDetailCinema: data.content,
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      dayjs(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const optionsInfoDetailCinema = state.infoDetailCinema?.map((item, idx) => ({
    value: item.maCumRap,
    label: item.tenCumRap,
  }));
  useEffect(() => {
    async function getInfoCinema() {
      try {
        let { data } = await requestMovie.get(
          "QuanLyRap/LayThongTinHeThongRap"
        );
        await setState({
          ...state,
          infoListCinema: data.content,
        });
      } catch (err) {
        console.log("err", err);
      }
    }
    getInfoCinema();
  }, []);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-6">Tạo Lịch Chiếu</h1>
      <div className="flex-wrap sm:flex justify-between items-center">
        <div className="card-film w-[70%] sm:w-[20%] mx-auto">
          <CardFilm film={film}></CardFilm>
        </div>
        <div className="form w-full sm:w-[50%]">
          <p className="text-3xl text-center mb-4 mt-4">{tenPhim}</p>

          <Form
            onSubmitCapture={formik.handleSubmit}
            size={"large"}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <Form.Item label="Hệ thống rạp">
              <Select
                placement="bottomLeft"
                options={optionsInfoListCinema}
                onChange={onChangeInfoListCinema}
                placeholder="Please select"
              />
            </Form.Item>
            <Form.Item label="Cụm rạp">
              <Select
                name="maRap"
                id="maRap"
                placement="bottomLeft"
                options={optionsInfoDetailCinema}
                onChange={(value) => {
                  formik.setFieldValue("maRap", value);
                }}
                placeholder="Please select"
              />
            </Form.Item>
            <Form.Item label="Ngày giờ chiếu">
              <DatePicker
                name="ngayChieuGioChieu"
                className="text-gray-900"
                showTime
                format={"DD/MM/YYYY hh:mm:ss"}
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Giá vé">
              <InputNumber
                defaultValue={75000}
                name="giaVe"
                id="giaVe"
                min={75000}
                max={150000}
                onChange={(giaVe) => {
                  formik.setFieldValue("giaVe", Math.round(giaVe * 100) / 100);
                }}
              />
            </Form.Item>
            <Form.Item className="text-center flex justify-center">
              <Button htmlType="submit" className="bg-blue-500" type="primary">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ShowTime;
