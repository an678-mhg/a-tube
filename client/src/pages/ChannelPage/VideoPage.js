import React, { useEffect, useState } from "react";
import { Spin } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GridLayout from "../../components/Shared/GridLayout";
import SkeletonVideoCard from "../../components/Skeleton/SkeletonVideoCard";
import VideoCard from "../../components/Video/VideoCard";
import { clearVideo, getChannelVideo } from "../../redux/slice/channelSlice";

const VideoPage = () => {
  const { videos, totalPage } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getChannelVideo({ id, page }));
      setLoading(false);
    })();

    return () => {
      setPage(1);
      dispatch(clearVideo());
    };
  }, [id]);

  useEffect(() => {
    (async () => {
      if (page === 1) return;
      setLoadMore(true);
      await dispatch(getChannelVideo({ id, page }));
      setLoadMore(false);
    })();
  }, [id, page]);

  if (loading)
    return (
      <div className="mt-10">
        <SkeletonVideoCard item={4} />
      </div>
    );

  return (
    <div className="mt-10">
      <GridLayout>
        {videos.map((p) => (
          <VideoCard
            edit={currentUser?._id === p?.writer?._id}
            key={p?._id}
            data={p}
          />
        ))}
      </GridLayout>
      {loadMore && (
        <div className="flex py-3 justify-center">
          <Spin />
        </div>
      )}
      {page < totalPage && (
        <div className="py-3 text-center w-full">
          <button
            onClick={() => setPage(page + 1)}
            className="py-2 px-3 bg-red-500 text-white rounded-md"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
