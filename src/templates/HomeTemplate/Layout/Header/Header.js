import { Select } from "antd";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logOut } from "../../../../redux/reducer/ManagementUserSlice";
import { USER_INFO } from "../../../../util/setting/config";
import vi from "../../../../asset/imgLegion/vn.jpg";
import en from "../../../../asset/imgLegion/en.webp";
import cinema from "../../../../asset/LogoCinema/cinema.png";

function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.ManagementUserSlice);
  const infoUser = JSON.parse(localStorage.getItem(USER_INFO));
  const [toggle, setToggle] = useState(false);
  const handleChange = (value) => {
    if (value == "Tiếng việt") {
      i18n.changeLanguage("vi");
    } else {
      i18n.changeLanguage("en");
    }
  };
  return (
    <div>
      <div className="header-2 text-white fixed mb-24 top-0 w-screen  z-10">
        <nav className="bg-[#1f1f1f] p-4   md:py-4">
          <div className="container px-4 mx-auto md:flex md:items-center">
            <div className="flex  rounded-lg justify-between items-center">
              <img
                className="w[70px] rounded-lg  h-[70px]"
                src={cinema}
                alt=""
              />
              <button
                onClick={() => {
                  setToggle(!toggle);
                }}
                className="border border-solid border-gray-600 px-3 py-1 rounded  opacity-50 hover:opacity-75 md:hidden"
                id="navbar-toggle"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>

            <div
              className={` md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 ${
                toggle ? "flex" : "hidden"
              }  `}
              id="navbar-collapse"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 lg:px-4 md:mx-2 text-white rounded bg-[#ff7f50]"
                    : "p-2 lg:px-4 md:mx-2  rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300"
                }
              >
                {t("Home")}
              </NavLink>
              <NavLink
                to="/booking-ticket"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 lg:px-4 md:mx-2 text-white rounded bg-[#ff7f50]"
                    : "p-2 lg:px-4 md:mx-2  rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300"
                }
              >
                {t("Booking ticket")}
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 lg:px-4 md:mx-2 text-white rounded bg-[#ff7f50]"
                    : "p-2 lg:px-4 md:mx-2  rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300"
                }
              >
                {t("Admin")}
              </NavLink>

              {localStorage.getItem(USER_INFO) ? (
                <div className="flex items-center justify-between">
                  <p
                    onClick={() => {
                      navigate("profile");
                    }}
                    className="p-2 cursor-pointer hover:text-blue-400"
                  >
                    {t("Hello")} {infoUser.hoTen}!!
                  </p>
                  <button
                    onClick={() => {
                      dispatch(logOut());
                      navigate("/");
                    }}
                    // to="/"
                    className="p-2 lg:px-4 md:mx-2  text-center border border-solid border-[#ff7f50] rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
                  >
                    {t("Log out")}
                  </button>
                </div>
              ) : (
                <div className="span flex justify-between">
                  <NavLink
                    to="login/sign-in"
                    className="p-2 lg:px-4 md:mx-2  rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300"
                  >
                    {t("Login")}
                  </NavLink>
                  <NavLink
                    to="login/sign-up"
                    className="p-2 lg:px-4 md:mx-2  text-center border border-solid border-[#ff7f50] rounded hover:bg-[#ff7f50] hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
                  >
                    {t("Sign up")}
                  </NavLink>
                </div>
              )}
              <Select
                defaultValue="Tiếng việt"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "Tiếng việt",
                    label: (
                      <div className="flex items-center justify-between">
                        <p>Tiếng việt</p>
                        <img className="w-5 h-4" src={vi} alt="" />
                      </div>
                    ),
                  },
                  {
                    value: "English",
                    label: (
                      <div className="flex items-center justify-between">
                        <p>English</p>
                        <img className="w-5 h-4" src={en} alt="" />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
