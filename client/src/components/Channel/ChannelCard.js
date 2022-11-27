import React from "react";
import { Link } from "react-router-dom";

const ChannelCard = ({ data }) => {
  return (
    <Link to={`/channel/${data?._id}`} className="flex items-center mb-4">
      <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
        <img
          alt={data?.name}
          className="w-full h-full object-cover"
          src={data?.avatar}
        />
      </div>
      <div className="ml-4 flex-1">
        <p className="text-md font-semibold">{data?.name}</p>
        <div className="mt-4">
          <p className="text-sm text-[#999]">
            {data?.email?.length > 30
              ? data?.email.slice(0, 30) + "..."
              : data?.email}
          </p>
          <p className="text-sm text-[#999]">
            {data?.description.length > 30
              ? data?.description.slice(0, 30) + "..."
              : data?.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;
