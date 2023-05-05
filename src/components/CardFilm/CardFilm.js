import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardFilm(props) {
  const { film } = props;
  const navigate = useNavigate();
  return (
    <article
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/detail/${film.maPhim}`);
      }}
      className="card rounded-lg "
    >
      <header className="card__thumb">
        <img className="" src={film.hinhAnh} />
      </header>
      {/* <date className="card__date">
        <span className="card__date__day">11</span>
        <br />
        <span className="card__date__month">Jan</span>
      </date> */}
      <div className="card__body">
        <div className="card__category">
          {film.dangChieu ? <span>đang chiếu</span> : <span>sắp chiếu</span>}
        </div>
        <h3 className="text-sm card__title truncate ... text-white">
          {film.tenPhim}
        </h3>
        <button
          onClick={(e) => {
            // e.stopPropagation();
            // navigate(`checkout/${film.maPhim}`);
          }}
          className="mt-3 w-full bg-transparent hover:bg-[#ff7f50] text-[#ff7f50] font-semibold hover:text-white py-2 px-4 border border-[#ff7f50] hover:border-transparent rounded"
        >
          Xem chi tiết
        </button>
        <p className="card__description">
          {film.moTa.length > 80 ? (
            <span>{film.moTa.slice(0, 80)}...</span>
          ) : (
            <span>{film.moTa}</span>
          )}
        </p>
      </div>
      <footer className="card__footer">
        <span className="icon ion-clock" /> 10 mins ago
        <span className="icon ion-chatbox" />
        <a href="#"> 145 comments</a>
      </footer>
    </article>
  );
}
