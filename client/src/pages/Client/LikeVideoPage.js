import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLikeVideoApi } from "../../api/videoApi";
import WantLogin from "../../components/Shared/WantLogin";
import Title from "../../components/Shared/Title";
import VideoCardRow from "../../components/Video/VideoCardRow";
import LoadingSpin from "../../components/Loading/LoadingSpin";
import NoResults from "../../components/Shared/NoResults";

const LikeVideoPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getLikeVideoApi();
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <LoadingSpin />;

  if (videos.length === 0) return <NoResults />;

  return (
    <div className="w-full text-white">
      <Title title={"Liked Video | ATube - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p?._id} data={p} />
      ))}
    </div>
  );
};

export default LikeVideoPage;
