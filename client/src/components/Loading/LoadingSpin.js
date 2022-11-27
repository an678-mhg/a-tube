import React from "react";
import { Spin } from "react-cssfx-loading/lib";

const LoadingSpin = () => {
  return (
    <div className="full-height flex items-center justify-center">
      <Spin />
    </div>
  );
};

export default LoadingSpin;
