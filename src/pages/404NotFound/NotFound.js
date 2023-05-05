import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png")`,
      }}
      className="not-found w-screen h-screen flex items-end justify-center"
    >
      {/* <img src="" alt="not-found" /> */}
      <Link
        to="/"
        className="text-4xl font-bold hover:text-blue-500 transition-all link-home"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
