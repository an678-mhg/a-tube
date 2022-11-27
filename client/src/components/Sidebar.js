import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logOut } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getChannelSubsrciptionApi } from "../api/channelApi";
import ChannelItem from "./Channel/ChannelItem";

const Sidebar = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [subChannel, setSubChannel] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const res = await getChannelSubsrciptionApi();
        if (res.data.success) {
          setSubChannel(res.data.subsrciption);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser]);

  return (
    <ul className="pt-5 h-[calc(100vh-65px)] overflow-auto scroll-none pl-4">
      <li>
        <NavLink
          activeclassname="active"
          to="/"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bx-home-alt mr-4"></i> Trang chủ
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/trending"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bxs-hot mr-4"></i> Thịnh hành
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/subsrciptions"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bxs-videos mr-4"></i> Đã đăng ký
        </NavLink>
      </li>
      <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>

      <li>
        <NavLink
          activeclassname="active"
          to="/favouites"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bx-movie-play mr-4"></i>Video yêu thích
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/history"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bx-history mr-4"></i> Video đã xem
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/liked-video"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <i className="text-[20px] bx bx-like mr-4"></i> Video đã thích
        </NavLink>
      </li>
      {currentUser && (
        <>
          <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>
          <li
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <button className="text-white p-2 text-[16px] flex items-center">
              <i className="bx bx-log-in-circle text-[20px] mr-4"></i> Đăng xuất
            </button>
          </li>
          <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>

          {subChannel.length > 0 && (
            <div className="text-white p-2 text-[16px]">
              <h1>Kênh đăng ký</h1>
              <div className="mt-4">
                {subChannel.map((p) => (
                  <ChannelItem key={p._id} data={p} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ul>
  );
};

export default Sidebar;
