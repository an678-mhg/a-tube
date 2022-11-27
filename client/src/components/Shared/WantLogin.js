import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const WantLogin = () => {
  const location = useLocation();

  return (
    <div className="w-full h-full flex justify-center items-center mx-auto">
      <div className="bg-[#222] max-w-[calc(100%-16px)] w-[400px] flex items-center justify-between flex-col p-4 rounded-sm modal-animation">
        <p className="py-3 px-5 text-white text-center text-lg font-semibold">
          Cần đăng nhập để vào trang này!
        </p>
        <Link
          to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
          className="py-1 px-4 bg-red-500 text-white rounded-md"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};

export default WantLogin;
