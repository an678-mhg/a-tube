import React from "react";

const GridLayout = ({ children }) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 text-white mb-5">
      {children}
    </div>
  );
};

export default GridLayout;
