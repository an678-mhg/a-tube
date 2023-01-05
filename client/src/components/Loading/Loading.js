import React from "react";
import { BarWave } from "react-cssfx-loading";

const Loading = () => {
  return (
    <div className="fixed bg-[#111] top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center z-[9999]">
      <BarWave color="#ef4444" />
    </div>
  );
};

export default Loading;
