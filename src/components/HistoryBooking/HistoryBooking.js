import _ from "lodash";
import moment from "moment";
import React from "react";

function HistoryBooking(props) {
  const { infoUserUpdate } = props;
  console.log(infoUserUpdate);
  return infoUserUpdate.thongTinDatVe?.map((ticket, idx) => {
    const seat = _.first(ticket.danhSachGhe);
    return (
      <div key={idx} className=" relative pl-[80px] ">
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

            <span className="text-gray-400 ml-3">{ticket.thoiLuongPhim}p</span>
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
}

export default HistoryBooking;
