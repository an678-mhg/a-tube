import React, { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title;
  });

  return <></>;
};

export default Title;
