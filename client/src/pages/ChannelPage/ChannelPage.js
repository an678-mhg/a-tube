import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useParams, Route } from "react-router-dom";
import ChannelInfo from "../../components/Channel/ChannelInfo";
import Loading from "../../components/Loading/Loading";
import Title from "../../components/Shared/Title";
import { getChannelInfo } from "../../redux/slice/channelSlice";
import PageNotFound from "../PageNotFound";
import DescriptionPage from "./DescriptionPage";
import HomePage from "./HomePage";
import VideoPage from "./VideoPage";

const ChannelPage = () => {
  const { profile, loading, error } = useSelector((state) => state.channel);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannelInfo(id));
  }, [id, dispatch]);

  if (error) return <PageNotFound />;

  return (
    <div>
      <Title title={`${profile?.name} | ATube video sharing website`} />
      <ChannelInfo profile={profile} />
      <Routes>
        <Route path="" element={<HomePage name={profile?.description} />} />
        <Route path="videos" element={<VideoPage />} />
        <Route
          path="descriptions"
          element={
            <DescriptionPage
              email={profile?.email}
              descriptions={profile?.description}
            />
          }
        />
      </Routes>

      {loading && <Loading />}
    </div>
  );
};

export default ChannelPage;
