import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeMenu from "../Home/HomeMenu/HomeMenu";
import Search from "antd/es/input/Search";
import { getListFilm } from "../../redux/reducer/ManagementFilmSlice";

const BookingTicket = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const onSearch = (value) => {
    dispatch(getListFilm(value));
  };
  const { listCinema } = useSelector(
    (state) => state.ManagementInfoCinemaSlice
  );
  return (
    <div className="mt-[6rem] p-9">
      {/* <div className="max-w-[500px] bg-[#1677ff] my-6 rounded-lg mx-auto ">
        <Search
          placeholder="Tìm phim"
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => {
            setSearch(e.target.value);

            // searchRef.current = setTimeout(() => {
            //   setSearch(e.target.value);
            // }, 6000);
          }}
          value={search}
          onSearch={onSearch}
        />
      </div> */}
      <HomeMenu listInfoCinema={listCinema} />
    </div>
  );
};

export default BookingTicket;
