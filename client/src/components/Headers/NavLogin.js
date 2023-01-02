import React from "react";
import { Link } from "react-router-dom";

const NavLogin = () => {
  return (
    <div className="flex items-center">
      <Link to="/sign-in" className="py-1 px-4 bg-red-500 rounded-full">
        Đăng nhập
      </Link>
    </div>
  );
};

export default NavLogin;
