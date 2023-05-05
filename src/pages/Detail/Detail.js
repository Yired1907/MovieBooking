import { Menu, Rate, Tabs } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink, useParams } from "react-router-dom";
import { getFilmDetail } from "../../redux/reducer/ManagementCinemaSilce";
import "./rating.css";
import YouTube from "react-youtube";
import LazyLoad from "react-lazyload";
function Detail(props) {
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });
  const [isMobile, setIsMobile] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const { filmDetail } = useSelector(
    (state) => state.ManagementInfoCinemaSlice
  );
  console.log(filmDetail);

  useEffect(() => {
    if (isMobileDevice) {
      setIsMobile("top");
    } else {
      setIsMobile("left");
    }
    window.scrollTo(0, 0);
    dispatch(getFilmDetail(id));
  }, []);

  // tabs antd
  const onChange = (key) => {
    console.log(key);
  };
  const renderCinemars = (film) => {
    return film?.cumRapChieu?.map((movie, idx) => (
      <div key={idx} className="text-white flex m-3 ">
        <img className="w-[50px] h-[50px]" src={movie.hinhAnh} alt="" />
        <div className="ml-2">
          <p>{movie.tenCumRap}</p>
          <p className="text-orange-500 mt-2 truncate ... w-full">
            {movie.diaChi}
          </p>
          <div className="grid grid-cols-4 gap-2 mt-2 w-[350px]">
            {movie.lichChieuPhim.map((time, idx) => (
              <NavLink
                to={`/checkout/${time.maLichChieu}`}
                key={idx}
                className="border rounded-lg p-1 "
              >
                {moment(time.ngayChieuGioChieu).format("hh:mm A")}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    ));
  };
  const items = [
    {
      key: "1",
      label: <span className="text-xl">Lịch chiếu</span>,
      children: (
        <Tabs
          centered
          defaultActiveKey="1"
          tabPosition={isMobile}
          style={{
            // overflowY: "scroll",
            height: 350,
            padding: 30,
            borderRadius: "12px",
          }}
          items={filmDetail?.heThongRapChieu?.map((film, idx) => {
            return {
              label: (
                <div key={idx} className="flex  justify-center items-center">
                  <img
                    className="w-[40px] mx-auto h-[40px] "
                    src={film.logo}
                    alt=""
                  />
                  {isMobile === "top" ? (
                    ""
                  ) : (
                    <span className=" text-white ml-2">
                      {film.tenHeThongRap}
                    </span>
                  )}
                </div>
              ),
              key: idx,
              disabled: idx === 28,
              children: (
                <div className="overflow-y-scroll h-[250px] lg:h-[330px]">
                  {renderCinemars(film)}
                </div>
              ),
            };
          })}
        />
      ),
    },
    {
      key: "2",
      label: <span className="text-xl">Thông tin</span>,
      children: (
        <div className="text-white text-lg px-11 w-full">
          <p>Nội dung :</p>
          <p>{filmDetail.moTa}</p>
          <br />
          <p>Trailer :</p>
          <div className="w-full">
            <iframe
              width="100%"
              height="400px"
              src={filmDetail.trailer}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: <span className="text-xl ">Đánh giá</span>,
      children: "Asdasd",
    },
  ];
  return (
    <div
      className="mt-[6rem] "
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(10px)",
        }}
        className=""
      >
        <div
          style={{
            paddingBottom: 0,
          }}
          className="flex  p-24 justify-around items-center"
        >
          <div className="flex shadow-2xl rounded-xl bg-black opacity-[1] flex-wrap items-center  ">
            <img
              className="h-[300px] mx-auto w-full rounded-lg  sm:w-[200px] shadow-xl mb-5 lg:mb-0"
              src={filmDetail.hinhAnh}
              alt=""
            />

            <div className="text-white py-4 flex flex-col lg:py-0 px-8">
              <p className="text-lg ">
                {moment(filmDetail.ngayKhoiChieu).format("YYYY/MM/DD")}
              </p>
              <div className="my-3  ">
                <span className="px-3 hidden sm:inline-block py-2 bg-orange-400 rounded-lg  mr-2">
                  {filmDetail.maNhom}
                </span>
                <span className="text-2xl my-3">{filmDetail.tenPhim}</span>
              </div>

              {filmDetail.moTa?.length > 200 ? (
                <p className=" w-[270px] ">
                  {filmDetail.moTa.slice(0, 200)}...
                </p>
              ) : (
                <p className="w-[270px] ">{filmDetail.moTa}</p>
              )}
            </div>
          </div>
          <div className=" hidden sm:block   ">
            {/* <p className="text-white text-2xl text-center mb-3">Đánh giá</p> */}
            <div
              className={`c100 m-0 mb-3  p${
                filmDetail?.danhGia * 10
              } big text-[200px] orange `}
            >
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
            <div className="text-white text-center ">
              <p className="text-orange-500 text-xl">Đánh giá: </p>
              <Rate style={{}} allowHalf value={filmDetail?.danhGia / 2} />
            </div>
          </div>
        </div>
        <div className=" px-[5%] sm:px-[20%] py-[50px] " style={{}}>
          {filmDetail?.heThongRapChieu?.length === 0 ? (
            <p className="text-white text-center text-xl">
              Không có lịch chiếu
            </p>
          ) : (
            <Tabs
              centered
              className="text-black py-7 rounded-xl bg-[#181823]"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Detail);
