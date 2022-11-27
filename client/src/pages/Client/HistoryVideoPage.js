import React, { useMemo } from "react";
import { getVideoLocal } from "../../utils/localStrorage";
import Title from "../../components/Shared/Title";
import VideoCardRow from "../../components/Video/VideoCardRow";
import NoResults from "../../components/Shared/NoResults";

const HistoryVideoPage = () => {
  const videos = useMemo(getVideoLocal, []);
  if (videos.length === 0) return <NoResults />;

  return (
    <div className="w-full text-white">
      <Title title={"History Video | ATube - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p?._id} data={p} />
      ))}
    </div>
  );
};

export default HistoryVideoPage;
