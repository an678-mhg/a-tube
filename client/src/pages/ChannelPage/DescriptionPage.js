import React from "react";

const DescriptionPage = ({ descriptions, email }) => {
  return (
    <div className="text-white p-4">
      <p className="font-semibold">Mô tả:</p>
      <p>{descriptions}</p>
      <p className="font-semibold mt-5">Liên hệ: </p>
      <p>Email: {email}</p>
    </div>
  );
};

export default DescriptionPage;
