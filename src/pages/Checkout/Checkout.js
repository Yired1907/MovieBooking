import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  activeTabs,
  bookingTicket,
  getInfoRoom,
  realTimeBooking,
  updateRealTime,
  updateTicket,
} from "../../redux/reducer/ManagementBookingSlice";
import { USER_INFO } from "../../util/setting/config";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Tabs } from "antd";
import { getHistoryUserBookTicket } from "../../redux/reducer/ManagementUserSlice";
import moment from "moment";
import { connection } from "../..";
function Checkout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const {
    infoRoom,
    listTicket,
    errorMessage,
    reloadPage,
    listOtherUserBooking,
  } = useSelector((state) => state.ManagementBookingSlice);
  const { userInfo } = useSelector((state) => state.ManagementUserSlice);
  const infoUser = JSON.parse(localStorage.getItem(USER_INFO));
  useEffect(() => {
    dispatch(getInfoRoom(id));
    // load list seat from server
    connection.on("loadDanhSachGheDaDat", (listSeat) => {
      dispatch(updateRealTime(listSeat));
    });
  }, []);
  useEffect(() => {
    if (reloadPage) {
      navigate(0);
    }
  }, [reloadPage]);
  const danhSachVe = listTicket.map((ticket, idx) => ({
    maGhe: ticket.maGhe,
    giaVe: ticket.giaVe,
  }));
  const renderGhe = () =>
    infoRoom.danhSachGhe?.map((ghe, idx) => {
      let index = listTicket.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe);
      let indexRealTime = listOtherUserBooking.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classUserBooking = "";
      let classUserBooked = "";
      let classChoseTicket = "";
      let classRealTime = "";
      if (index !== -1) {
        classChoseTicket = "bg-[#5D9C59] text-white";
      }
      if (ghe.daDat) {
        classUserBooked = "bg-[#EB455F] text-white";
      }
      if (
        JSON.parse(localStorage.getItem(USER_INFO)).taiKhoan ===
        ghe.taiKhoanNguoiDat
      ) {
        classUserBooking = "bg-[#865DFF]";
      }
      if (indexRealTime != -1) {
        classRealTime = "bg-[#D09CFA]";
      }
      return (
        <Fragment key={idx}>
          <button
            onClick={() => {
              // dispatch(updateTicket(ghe,id));
              dispatch(realTimeBooking({ ghe, id }));
            }}
            disabled={ghe.daDat || classRealTime !== ""}
            className={
              ghe.loaiGhe === "Thuong"
                ? `w-[35px] h-[35px] m-1 ${classRealTime} ${classUserBooking}  ${classUserBooked}  
             text-center ${classChoseTicket}  rounded-lg border border-gray-700  `
                : ` ${classUserBooked}  ${classRealTime}  ${classUserBooking} w-[35px] h-[35px] m-1  text-center rounded-lg   border-4 border-red-900 ${classChoseTicket}  ${classUserBooking} `
            }
          >
            {ghe.daDat ? (
              classUserBooking !== "" ? (
                <UserOutlined />
              ) : (
                "X"
              )
            ) : (
              ghe.tenGhe
            )}
          </button>
          {(idx + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  return (
    <div className="grid grid-cols-12  h-[100%]  ">
      <div className="col-span-full lg:col-span-9  text-white ">
        <div className="bg-[#f26b38] p-5">
          <h1 className="text-3xl ">Chọn ghế</h1>
          <div className=" bg-white  text-gray-700 text-left lg:text-center    overflow-auto p-9">
            <div className="lg:w-full text-[14px] w-[900px]">{renderGhe()}</div>
            <div className="flex w-[200px] lg:w-full flex-wrap justify-start lg:justify-center mt-7">
              <div className="flex items-center">
                <p
                  className="w-[35px] h-[35px] m-1   
             text-center   rounded-lg border border-gray-700"
                ></p>
                <span>Ghế có thể đặt</span>
              </div>
              <div className="flex items-center">
                <p
                  className="w-[35px] h-[35px] m-1 bg-[#EB455F] text-white  
             text-center rounded-lg border border-gray-700 flex items-center justify-center"
                >
                  X
                </p>
                <span>Ghế đã đặt</span>
              </div>
              <div className="flex items-center">
                <p className="   w-[35px] h-[35px] m-1  text-center rounded-lg   border-4 border-red-900 "></p>
                <span>Ghế Vip</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full lg:col-span-3 h-full  text-white px-3">
        <div className="px-6 py-3 h-full shadow-2xl">
          <div className="border-b-2 border-gray-500 py-3   text-center ">
            <strong className="text-5xl text-[#B5F1CC]">
              {listTicket
                .reduce((bill, ghe, idx) => bill + ghe.giaVe, 0)
                .toLocaleString()}
              vnd
            </strong>
          </div>
          <div className="border-b-2  border-gray-500 py-3 ">
            <img
              className="w-[50%] py-2 mx-auto  h-[200px]"
              src={infoRoom.thongTinPhim?.hinhAnh}
              alt=""
            />
            <strong className="text-lg">
              Tên phim: {infoRoom.thongTinPhim?.tenPhim}
            </strong>
            <p>Địa chỉ: {infoRoom.thongTinPhim?.diaChi}</p>
            <p>
              Ngày chiếu: {infoRoom.thongTinPhim?.gioChieu} <span></span>
              {infoRoom.thongTinPhim?.ngayChieu}
            </p>
          </div>
          <div className="border-b-2  border-gray-500 py-3  flex justify-between">
            <strong className="text-[#D61355] flex flex-wrap w-[200px]">
              Ghế :
              {_.sortBy(listTicket, ["stt"]).map((ghe, idx) => (
                <span key={idx} className="ml-2">
                  {ghe.tenGhe}
                </span>
              ))}
            </strong>
            <strong className="text-[#B5F1CC] text-lg">
              {listTicket
                .reduce((bill, ghe, idx) => bill + ghe.giaVe, 0)
                .toLocaleString()}
              vnd
            </strong>
          </div>
          <div className="border-b-2 border-gray-500 py-3  ">
            <p className="text-gray-400 mb-2">E-mail</p>
            <p>{infoUser.email}</p>
          </div>
          <div className="border-b-2 border-gray-500 py-3  ">
            <p className="text-gray-400 mb-2">Phone</p>
            <p>{infoUser.soDT}</p>
          </div>
          <div className="flex justify-around mt-5">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="p-3  w-[40%] rounded-md text-xl flex items-center justify-around border border-gray-50 transition hover:bg-[#fff] hover:text-black text-white"
            >
              <ArrowLeftOutlined />
              Trở lại
            </button>
            <button
              onClick={() => {
                dispatch(
                  bookingTicket({
                    maLichChieu: id,
                    danhSachVe,
                  })
                );
              }}
              className="p-3   w-[40%] text-xl rounded-md  bg-[#f26b38] transition text-white"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bookingresults(props) {
  const dispatch = useDispatch();
  const { historyUserBookTicket } = useSelector(
    (state) => state.ManagementUserSlice
  );
  console.log(historyUserBookTicket.thongTinDatVe);
  console.log(historyUserBookTicket);
  useEffect(() => {
    dispatch(getHistoryUserBookTicket());
  }, []);
  const renderHistoryBooking = () => {
    return historyUserBookTicket.thongTinDatVe?.map((ticket, idx) => {
      const seat = _.first(ticket.danhSachGhe);
      return (
        <div key={idx} className="relative pl-[80px] ">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute top-0 left-0 flex h-full w-[80px] items-center justify-center  ">
              <img
                className="rounded-md mr-3  w-full h-full"
                src={ticket.hinhAnh}
                alt=""
              />
            </div>
            <div className="flex items-center">
              <p className="text-2xl text-indigo-600 truncate ...">
                {ticket.tenPhim}
              </p>

              <span className="text-gray-400 ml-3">
                {ticket.thoiLuongPhim}p
              </span>
            </div>
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            <p>
              {" "}
              <strong>Ngày đặt:</strong>{" "}
              {moment(ticket.ngayDat).format("DD/MM/YYYY")}
            </p>

            <p>
              <strong>Địa chỉ:</strong> {seat.tenHeThongRap}
            </p>
            <div className="flex truncate ...">
              <p className="">
                <strong>Tên rạp</strong> {seat.tenCumRap}
              </p>
              <p></p>
              <p>
                <strong> Ghế :</strong>
                {ticket.danhSachGhe.slice(0, 3).map((ghe, idx) => {
                  return (
                    <span key={idx} className="text-[#AA77FF] ">
                      [{ghe.tenGhe}]{" "}
                    </span>
                  );
                })}
                <span>{ticket.danhSachGhe.length > 3 ? "..." : ""}</span>
              </p>
            </div>
          </dd>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="bg-white shadow-2xl  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Deploy faster
            </h2> */}
            <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-600   sm:text-4xl">
              Lịch sử đặt vé khách hàng
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hãy xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn nhé
              !
            </p>
          </div>
          <div className="mx-auto mt-16  sm:mt-20 lg:mt-24 ">
            <dl className="grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {renderHistoryBooking()}
            </dl>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default function (props) {
  const dispatch = useDispatch();
  const { ActiveTabs } = useSelector((state) => state.ManagementBookingSlice);
  const items = [
    {
      key: "1",
      label: `01 CHỌN GHẾ & THANH TOÁN`,
      children: <Checkout {...props} />,
    },
    {
      key: "2",
      label: `02 KẾT QUẢ ĐẶT VÉ`,
      children: <Bookingresults {...props} />,
    },
  ];
  return (
    <div className="bg-[#3f3f3f] p-5 mt-[6rem]">
      <Tabs
        className=" "
        size="large"
        defaultActiveKey="1"
        activeKey={ActiveTabs}
        items={items}
        onChange={(key) => {
          dispatch(activeTabs(key));
        }}
      />
      ;
    </div>
  );
}
