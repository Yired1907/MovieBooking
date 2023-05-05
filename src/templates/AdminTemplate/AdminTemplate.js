import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  AlignLeftOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import cinema from "../../asset/LogoCinema/cinema.png";
import { USER_INFO } from "../../util/setting/config";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/reducer/ManagementUserSlice";
import { openCustomNotificationWithIcon } from "../../util/setting/nontification";

function AdminTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState({
    navFilm: 0,
    infoUser: false,
  });
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
  if (
    localStorage.getItem(USER_INFO) &&
    userInfo.maLoaiNguoiDung === "QuanTri"
  ) {
    return (
      <>
        <div>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <button
                    onClick={() => {
                      setDropDown({ ...dropDown, navFilm: !dropDown.navFilm });
                    }}
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <AlignLeftOutlined className="text-xl" />
                    {/* <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg> */}
                  </button>
                  <div
                    onClick={() => {
                      navigate("/");
                    }}
                    className="flex w-[100px] ml-2 md:mr-24 cursor-pointer"
                  >
                    {/* <img
                    src={cinema}
                    className="h-8 w-full mr-3"
                    alt="FlowBite Logo"
                  /> */}
                    <span className="self-center text-[#B73E3E] text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                      CINEPLEXX
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ml-3">
                    <div>
                      <button
                        onClick={() => {
                          setDropDown({
                            ...dropDown,
                            infoUser: !dropDown.infoUser,
                          });
                        }}
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown-user"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="user photo"
                        />
                      </button>
                    </div>
                    <div
                      className={`z-50 ${
                        dropDown.infoUser ? "block" : "hidden"
                      } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                      id="dropdown-user"
                      style={{
                        position: "absolute",
                        inset: "100% 0 auto auto",
                        margin: "0px",
                      }}
                    >
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {userInfo.hoTen}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {userInfo.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Cập nhật thông tin tài khoản
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              dispatch(logOut());
                              navigate("/");
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
              !dropDown.navFilm ? "-translate-x-full" : "transform-none"
            }  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setDropDown({ ...dropDown, navFilm: 2 });
                      navigate("/admin");
                    }}
                    type="button"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    {/* <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg> */}
                    <UserOutlined />

                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Quản lý người dùng
                    </span>

                    {/* <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg> */}
                  </button>
                  {/* <ul
                  id="dropdown-example"
                  className={` ${
                    dropDown.navFilm === 2 ? "" : "hidden"
                  }  space-y-2`}
                >
                  <li>
                    <NavLink to="film">
                      <a className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        Cập nhật thông tin cá nhân
                      </a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="film/add-new">
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Thêm Phim
                      </a>
                    </NavLink>
                  </li>
                </ul> */}
                </li>
                <li>
                  <button
                    onClick={() => {
                      setDropDown({ ...dropDown, navFilm: 1 });
                    }}
                    type="button"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    {/* <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg> */}
                    <PieChartOutlined />

                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Quản lý phim
                    </span>

                    {/* <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg> */}
                  </button>
                  <ul
                    id="dropdown-example"
                    className={` ${
                      dropDown.navFilm === 1 ? "" : "hidden"
                    }  space-y-2`}
                  >
                    <li>
                      <NavLink to="film">
                        <a className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                          Danh sách phim
                        </a>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="film/add-new">
                        <a
                          href="#"
                          className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          Thêm Phim
                        </a>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
          <div className="p-0 sm:p-4 sm:ml-64">
            <div className="p-4 border-2   mt-14">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    openCustomNotificationWithIcon(
      "error",
      "Không thể truy cập trang quản trị",
      `Tài khoản của bạn không có quyền truy cập`,
      
      "topRight"
    );
    return <Navigate to="/login/sign-in" />;
  }
}

export default AdminTemplate;
