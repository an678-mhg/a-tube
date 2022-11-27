import React from "react";

const NoResults = () => {
  return (
    <div className="full-height flex justify-center items-center w-full">
      <img
        className="w-[564px] h-[288] object-cover"
        src={
          "https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png"
        }
        alt="img"
      />
    </div>
  );
};

export default NoResults;
