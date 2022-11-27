import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideoFavourite } from "../../redux/slice/videoFavouriteSlice";
import Title from "../../components/Shared/Title";
import VideoCardRow from "../../components/Video/VideoCardRow";
import LoadingSpin from "../../components/Loading/LoadingSpin";
import NoResults from "../../components/Shared/NoResults";
import PageNotFound from "../PageNotFound";
import WantLogin from "../../components/Shared/WantLogin";

const FavouritePage = () => {
  const { videos, error, loading } = useSelector((state) => state.favourite);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    dispatch(getVideoFavourite());
  }, [dispatch, currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <LoadingSpin />;

  if (error) return <PageNotFound />;

  if (videos.length === 0) return <NoResults />;

  return (
    <div className="w-full text-white">
      <Title title={"Trending | ATube - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p?._id} data={p} />
      ))}
    </div>
  );
};

export default FavouritePage;
