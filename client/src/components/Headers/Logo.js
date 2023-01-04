import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ setShowMenu }) => {
  return (
    <div className="py-1 text-white pl-4">
      <div className="flex items-center justify-between">
        <Link className="flex items-center text-[20px] font-semibold" to="/">
          <i className="text-4xl text-red-500 mr-2 rounded bx bxl-youtube"></i>
          ATube
        </Link>

        <div
          onClick={() => setShowMenu(false)}
          className="flex items-center justify-center lg:hidden"
        >
          <i className="bx bx-x text-[25px]"></i>
        </div>
      </div>
    </div>
  );
};

export default Logo;
