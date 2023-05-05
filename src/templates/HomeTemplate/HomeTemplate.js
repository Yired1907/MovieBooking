import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
function HomeTemplate(props) {
  const { Element, ...rest } = props;
  return (
    <div className="bg-[#3f3f3f]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeTemplate;
