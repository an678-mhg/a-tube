import React from "react";
import { Link } from "react-router-dom";
import ImageFade from "../Shared/ImgFade";

const ChannelCard = ({ data }) => {
  return (
    <Link to={`/channel/${data?._id}`} className="flex items-center mb-4">
      <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
        <ImageFade
          alt={data?.name}
          className="w-full h-full object-cover"
          lazy_src={data?.avatar}
        />
      </div>
      <div className="ml-4 flex-1">
        <p className="text-md font-semibold">{data?.name}</p>
        <div className="mt-1">
          <p className="text-sm text-[#999] line-clamp-1">{data?.email}</p>
          <p className="text-sm text-[#999] line-clamp-1">
            {data?.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;
