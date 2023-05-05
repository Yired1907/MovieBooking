import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Radio, Space, Tabs } from "antd";
import { useMediaQuery } from "react-responsive";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";
import { get } from "lodash";
// import moment from "moment";
function HomeMenu(props) {
  // reposnive

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });
  const [isMobile, setIsMobile] = useState("");

  const { listInfoCinema } = props;
  const [tabPosition, setTabPosition] = useState("left");

  // Menu responsive
  const changeTabPosition = (e) => {
    console.log(e);
  };
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const onClick = (e) => {
    console.log("click ", e);
  };

  // hool
  useEffect(() => {
    if (isMobileDevice) {
      setIsMobile("top");
    } else {
      setIsMobile("left");
    }
  }, []);

  const renderFilm = (rap) => {
    return rap.danhSachPhim.map((film, idx) => (
      <div
        key={idx}
        className=" mb-4 pb-4 text-white flex border-b-2 rounded-md"
      >
        <div
          style={{
            backgroundImage: `url(${film.hinhAnh})`,
          }}
          className="w-[60px] h-[60px] bg-cover"
        >
          {/* <img
            className="w-[100%] h-[100%] rounded-lg "
            src={film.hinhAnh}
            alt=""
          /> */}
        </div>

        <div className="ml-2">
          <h1 className="text-lg mb-1 truncate ...">{film.tenPhim}</h1>
          {film.hot ? (
            <span className="px-3 py-1 rounded-md text-white bg-orange-400">
              Hot
            </span>
          ) : (
            <span className="px-3 py-1 rounded-md text-white bg-[#1d4ed8]">
              New
            </span>
          )}
          <div className="grid grid-cols-4 lg:grid-cols-8 text-xs gap-2 mt-4 ">
            {film.lstLichChieuTheoPhim.map((time, idx) => (
              <NavLink
                to={`/checkout/${time.maLichChieu}`}
                key={idx}
                className="border-[1px] border-[#ffffff6e] p-[5px] rounded-md"
              >
                {moment(time.ngayChieuGioChieu).format("hh:mm A")}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    ));
  };
  const renderTabsCinema = (cumRap) => {
    if (isMobile === "top") {
      const items = cumRap.lstCumRap.map((rap, idx) =>
        getItem(
          <div className="">
            <h1 className="truncate ..." style={{ lineHeight: "20px" }}>
              {rap.tenCumRap}
            </h1>
            <h1
              className="truncate ..."
              style={{ lineHeight: "20px", color: "#ff7f50" }}
            >
              {rap.diaChi}
            </h1>
          </div>,

          rap.maCumRap,
          <img
            src={rap.hinhAnh}
            className="h-[45px] w-[45px] rounded-xl"
            alt=""
          ></img>,
          rap.danhSachPhim.map((film, idx) =>
            getItem(
              <div key={idx} className="flex ">
                <img className="w-[50px] h-[50px]" src={film.hinhAnh} alt="" />
                <div className="ml-2">
                  <p className="leading-none">{film.tenPhim}</p>
                  {film.hot ? (
                    <span className="px-3 py-1 mt-[-5px] rounded-md text-white bg-orange-400">
                      Hot
                    </span>
                  ) : (
                    <span className="px-3 py-1 mt-[-5px] rounded-md text-white bg-[#1d4ed8]">
                      New
                    </span>
                  )}
                </div>
              </div>,
              film.maPhim,
              null,
              [
                getItem(
                  <div className="grid grid-cols-3 h-full gap-2 my-2">
                    {film.lstLichChieuTheoPhim.map((time, idx) => (
                      <div
                        key={idx}
                        className="flex border-[1px] border-[#ffffff6e] p-[5px] rounded-md"
                      >
                        <NavLink
                          to={`/checkout/${time.maLichChieu}`}
                          className=" ml-2"
                          key={idx}
                        >
                          {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                        </NavLink>
                      </div>
                    ))}
                  </div>,
                  1,
                  null
                ),
              ]

              // film.lstLichChieuTheoPhim.map((showTime, idx) =>
              //   getItem(
              //     <p className="text-white">
              //       {moment(showTime.tenRap).format("hh:mm A")}
              //     </p>,
              //     showTime.maLichChieu,
              //     null
              //   )
              // )
            )
          )
        )
      );

      return (
        <Menu
          className="rounded-xl"
          theme="dark"
          onClick={onClick}
          style={{
            width: "100%",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      );
    } else {
      return (
        <Tabs
          type="card"
          // onChange={changeTabPosition}
          tabPosition={tabPosition}
          items={cumRap.lstCumRap.map((rap, i) => {
            return {
              label: (
                <div className="flex">
                  <img
                    key={i}
                    className="h-[50px] w-[50px] rounded-lg"
                    src={rap.hinhAnh}
                    alt=""
                  />
                  <div className="ml-2 text-left w-[100px] lg:w-[400px]">
                    <p className="text-white text-lg leading-none mb-3 truncate ...">
                      {rap.tenCumRap}
                    </p>
                    <p className="text-orange-400 leading-none text-left truncate ...">
                      {rap.diaChi}
                    </p>
                  </div>
                </div>
              ),
              key: i,
              children: (
                <div className="h-[500px] custom-bar  overflow-y-scroll">
                  {renderFilm(rap)}
                </div>
              ),
            };
          })}
        />
      );
    }
  };

  return (
    <div className="container my-[35px]">
      <Tabs
        onChange={changeTabPosition}
        tabPosition={isMobile}
        items={listInfoCinema.map((rap, i) => {
          return {
            label: (
              <img
                key={i}
                className="h-[50px] w-[50px] rounded-full"
                src={rap.logo}
                alt=""
              />
            ),
            key: i,
            children: renderTabsCinema(rap),
          };
        })}
      />
    </div>
  );
}

export default React.memo(HomeMenu);

{
  /* <div className="py-3 flex">
<img className="h-[60px] w-[60px]" src={rap.hinhAnh} alt="" />
<div className="ml-2">
  <p className="text-white text-lg ">{rap.tenCumRap}</p>
  <p className="text-orange-400 text-sm ">Chi tiết</p>
</div>
</div> */
}
