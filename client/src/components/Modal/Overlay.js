import React from "react";

const Overlay = ({ children, setShow }) => {
  return (
    <div
      className="fixed top-0 bottom-0 right-0 left-0 background-overlay flex items-center justify-center z-[9999]"
      onClick={() => setShow(false)}
    >
      {children}
    </div>
  );
};

export default Overlay;
