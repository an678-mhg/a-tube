import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ id }) => {
  const location = useLocation();

  return (
    <div className="bg-[#222]">
      <div className="p-4">
        <ul className="flex overflow-auto navigation justify-between md:justify-start">
          <li
            className={`${
              location.pathname === `/channel/${id}` ? "active-line" : null
            }  py-3 navigation-item mr-10 block`}
          >
            <Link to={`/channel/${id}`}>Trang chủ</Link>
          </li>
          <li
            className={`${
              location.pathname === `/channel/${id}/videos`
                ? "active-line"
                : null
            }  py-3 navigation-item mr-10 block`}
          >
            <Link to={`/channel/${id}/videos`}>Video</Link>
          </li>
          <li
            className={`${
              location.pathname === `/channel/${id}/descriptions`
                ? "active-line"
                : null
            }  py-3 navigation-item block`}
          >
            <Link to={`/channel/${id}/descriptions`}>Giới thiệu</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
