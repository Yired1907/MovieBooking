import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CardFilm from "../../components/CardFilm/CardFilm";
import Carousel from "../../templates/HomeTemplate/Layout/Carousel/Carousel";
import Footer from "../../templates/HomeTemplate/Layout/Footer/Footer";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import HomeMenu from "./HomeMenu/HomeMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import {
  getListFilm,
  setAllFilm,
  setPhimDangChieu,
  setPhimSapChieu,
} from "../../redux/reducer/ManagementFilmSlice";
import { getOPhim } from "../../redux/reducer/CarouselSlice";
import CardFilmV2 from "../../components/CardFilm/CardFilmV2";
import CardFilmV3 from "../../components/CardFilm/CardFilmV3";
import { getListInfoCinema } from "../../redux/reducer/ManagementCinemaSilce";
import ResponsiveDivice from "../../util/setting/responsiveDivice";
function Home() {
  const dispatch = useDispatch();

  const { listFilm } = useSelector((state) => state.ManagementFilmSlice);
  const { listCinema } = useSelector(
    (state) => state.ManagementInfoCinemaSlice
  );
  console.log(listFilm);
  useEffect(() => {
    dispatch(getListFilm());
    dispatch(getListInfoCinema());
  }, []);

  const renderFilm = () =>
    listFilm.map((item, index) => (
      <SwiperSlide key={index}>
        <CardFilm film={item} />
      </SwiperSlide>
    ));
  const renderFilmHot = () => {
    return listFilm
      .filter((film) => film.hot === true)
      .map((item, idx) => (
        <SwiperSlide key={idx}>
          <CardFilmV2 film={item} />
        </SwiperSlide>
      ));
  };
  return (
    <div className="bg-[#3f3f3f]">
      <Carousel />
      <div className=" px-8 text-center text-xs  sm:text-xl mt-6 w-full">
        <button
          onClick={() => {
            dispatch(setAllFilm());
          }}
          className="p-2 m-2 block mx-auto  sm:inline-block  hover:bg-[#ff7f50] text-white  transition lg:px-4  border border-solid border-[#ff7f50] focus:bg-[#ff7f50] text-[#ff7f50] rounded bg-current-indigo-600"
        >
          Tất cả phim
        </button>
        <button
          onClick={() => {
            dispatch(setPhimSapChieu());
          }}
          className="p-2 m-2  hover:bg-[#ff7f50] text-white  transition lg:px-4 md:mx-2 border border-solid border-[#ff7f50] focus:bg-[#ff7f50] text-[#ff7f50] rounded bg-current-indigo-600"
        >
          Phim sắp chiếu
        </button>
        <button
          onClick={() => {
            dispatch(setPhimDangChieu());
          }}
          className="p-2 m-2 focus:bg-[#ff7f50] transition lg:px-4 md:mx-2 text-[#ff7f50] text-center border border-solid border-[#ff7f50] rounded hover:bg-[#ff7f50] text-white  transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
        >
          Phim đang chiếu
        </button>
      </div>
      <button></button>
      <Swiper
        style={{
          width: "80%",
          padding: "25px",
        }}
        slidesPerView={4}
        breakpoints={{
          200: {
            centeredSlides: false,

            slidesPerView: 1.2,
            grid: {
              rows: 1,
              fill: "row",
            },
          },
          640: {
            slidesPerView: 2.2,
          },
          769: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        grid={{
          rows: 2,
          fill: "row",
        }}
        speed={800}
        // centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className="mySwiper "
      >
        {renderFilm()}
      </Swiper>
      <div className="">
        <h1 className="text-4xl font-bold text-center text-white">Phim hot</h1>
        <Swiper
          style={{
            width: "100%",
            padding: "5%",
          }}
          slidesPerView={4}
          breakpoints={{
            200: {
              centeredSlides: false,

              slidesPerView: 2,
              grid: {
                rows: 1,
                fill: "row",
              },
            },
            640: {
              slidesPerView: 2.2,
            },
            769: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          speed={800}
          // centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          // navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Grid, Pagination, Navigation, Autoplay]}
          className="mySwiper "
        >
          {renderFilmHot()}
        </Swiper>
      </div>
      <HomeMenu listInfoCinema={listCinema} />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
