import React from "react";

const HomePage = ({ name }) => {
  return (
    <div className="text-white p-4 mt-5 w-full flex justify-center items-center">
      <h1 className="font-semibold text-center">{`${name}`}</h1>
    </div>
  );
};

export default HomePage;
