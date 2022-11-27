import React, { useState } from "react";
import { parseLinkDescription } from "../../utils/parseLinkDescription";

const VideoDesc = ({ description }) => {
  const [showAllDesc, setShowAllDesc] = useState(false);

  return (
    <div className="mt-2">
      <p
        dangerouslySetInnerHTML={{ __html: parseLinkDescription(description) }}
        className={`text-sm ${showAllDesc ? "line-clamp-100" : "line-clamp-2"}`}
      />

      <p
        onClick={() => setShowAllDesc(!showAllDesc)}
        className="text-gray-400 cursor-pointer"
      >
        {showAllDesc ? "Ẩn bớt" : "Xem thêm"}
      </p>
    </div>
  );
};

export default VideoDesc;
