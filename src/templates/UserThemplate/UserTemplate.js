import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function UserTemplate() {
  return (
    <div className="">
      <section className="gradient-form  bg-neutral-200 dark:bg-neutral-700">
        <h1 className="text-4xl text-center pt-3 text-white font-bold">
          Chúc bạn xem phim vui vẻ !!!
        </h1>
        <div className="container  h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <Outlet />
                  <div
                    className="flex relative items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background: `url("https://img.freepik.com/free-vector/realistic-boxing-day-sale-background_23-2149132779.jpg?w=1060&t=st=1678178287~exp=1678178887~hmac=db7a2787c0fdf2059cc138ba00217f75e9a9cd6f0ee6849ca25361de8fb5c969")`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* <div className="px-4 absolute bottom-0  py-6 text-white md:mx-6 md:p-12">
                      <strong className="text-lg text-center">
                        Chương trình khuyến mãi dành riêng cho thành viên CGV
                      </strong>
                      <br />
                      <strong className="text-lg text-center">
                        Quà tặng sinh nhật hấp dẫn
                      </strong>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserTemplate;
