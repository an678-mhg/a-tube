import React from "react";
import { Link } from "react-router-dom";
import { calculateCreatedTime } from "../../utils/formatDate";
import ImgFade from "../Shared/ImgFade";

const VideoCardRow = ({ data }) => {
  return (
    <Link to={`/details/${data._id}`} className="flex justify-center mb-4">
      <div
        className={`aspect-[16/9] w-[200px] max-w-[50%] bg-[#333] rounded-md overflow-hidden`}
      >
        <ImgFade
          lazy_src={
            data?.videoThumnail
              ? data?.videoThumnail
              : data?.videoUrl?.replace(".mp4", ".jpg")
          }
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-2 h-full flex-1">
        <p className="text-[14px] font-semibold line-clamp-1">{data?.title}</p>
        <p className="text-xs font-bold mt-1 text-[#999] line-clamp-1">
          {data?.writer?.name}
        </p>
        <div className="mt-1 text-[#999]">
          <p className="text-xs flex items-center">
            {data?.totalView} lượt xem
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCardRow;
