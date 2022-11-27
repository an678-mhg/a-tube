import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Client/HomePage";
import Header from "../../components/Headers/Header";
import UploadPage from "../UploadPage";
import DetailsVideo from "../DetailsVideo";
import SubsrciptionPage from "../Client/SubsrciptionPage";
import TrendingPage from "../Client/TrendingPage";
import Logo from "../../components/Headers/Logo";
import SearchResults from "../SearchResults";
import FavouritePage from "../Client/FavouritePage";
import PageNotFound from "../PageNotFound";
import LikeVideoPage from "../Client/LikeVideoPage";
import HistoryVideoPage from "../Client/HistoryVideoPage";
import ChannelPage from "../ChannelPage/ChannelPage";
import Overlay from "../../components/Modal/Overlay";

const ClientPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex">
      <div
        className={`w-[216px] pt-[5px] max-w-full mr-5 lg:block fixed lg:static top-0 bottom-0 bg-[#181818] lg:bg-transparent lg:pr-0 pr-4 z-[1000] ${
          showMenu ? "left-0 z-[99999]" : "left-[-100%]"
        } transition-all`}
      >
        <Logo setShowMenu={setShowMenu} />
        <Sidebar setShowMenu={setShowMenu} />
      </div>
      {showMenu && <Overlay setShow={setShowMenu} />}
      <div className="flex-1 h-screen max-w-full">
        <Header setShowMenu={setShowMenu} />
        <div className="pt-3 px-4">
          <div className="h-[calc(100vh-79px)] overflow-auto scroll-none-2">
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="details/:id" element={<DetailsVideo />} />
              <Route path="subsrciptions" element={<SubsrciptionPage />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="favouites" element={<FavouritePage />} />
              <Route path="liked-video" element={<LikeVideoPage />} />
              <Route path="history" element={<HistoryVideoPage />} />
              <Route path="channel/:id/*" element={<ChannelPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
