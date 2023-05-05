import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Grid,
  EffectFade,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../../../redux/reducer/CarouselSlice";
import { getListFilm } from "../../../../redux/reducer/ManagementFilmSlice";
const arrImg2 = [
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/lWqjXgut48IK5f5IRbDBAoO2Epp.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wybmSmviUXxlBmX44gtpow5Y9TB.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wybmSmviUXxlBmX44gtpow5Y9TB.jpgz",
];
function Carousel() {
  const { arrImg } = useSelector((state) => state.CaurouselSlice);
  const dispatch = useDispatch((state) => state.CaurouselSlice);
  useEffect(() => {
    dispatch(getBanner());
  }, []);
  return (
    <div className="pt-[6rem] ">
      <Swiper
        centeredSlides={true}
        // navigation={true}
        breakpoints={{
          200: {
            navigation: false,
          },
          640: {
            navigation: true,
          },
        }}
        slidesPerView={1}
        effect={"fade"}
        loop={true}
        spaceBetween={30}
        speed={1300}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay, Grid, EffectFade]}
        className="mySwiper "
      >
        {arrImg2.map((img, idx) => (
          <SwiperSlide className="  " key={idx}>
            <img className=" h-[350px] sm:h-[600px]  w-full" src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
