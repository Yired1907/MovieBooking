import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingSlice);
  if (isLoading) {
    return (
      <div className="fixed bg-white z-10 w-screen h-screen flex items-center justify-center">
        <img className="" src={require("../Loading/Loading.gif")} alt="" />
      </div>
    );
  } else {
    return "";
  }
}
