import React from "react";

const ChannelBackGround = ({ background }) => {
  return (
    <div className="aspect-[18/5] w-full">
      <img
        className="w-full h-full object-cover"
        alt="background"
        src={background}
      />
    </div>
  );
};

export default ChannelBackGround;
