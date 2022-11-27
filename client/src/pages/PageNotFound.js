import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Shared/Title";

const PageNotFound = () => {
  return (
    <div className="bg-[#222] h-full flex items-center justify-center">
      <Title title={"404 Page"} />
      <div className="error">
        <div className="error-body container">
          <h1 className="error-title">Oops!</h1>
          <Link to="/">Go to HomePage</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
