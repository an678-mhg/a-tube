import React from "react";
import ChannelBackGround from "./ChannelBackGround";
import ChannelInfoTop from "./ChannelInfoTop";
import Navigation from "./Navigation";

const ChannelInfo = ({ profile, sub }) => {
  return (
    <div className="text-white">
      <ChannelBackGround background={profile?.background} />
      <ChannelInfoTop profile={profile} sub={sub} />
      <Navigation id={profile?._id} />
    </div>
  );
};

export default ChannelInfo;
