import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkDisLikeVideo,
  checkLike,
  clearVideo,
  getVideoById,
  setIsDisLike,
  setIsLike,
} from "../redux/slice/videoSlice";
import Loading from "../components/Loading/Loading";
import VideoInfo from "../components/Video/VideoInfo";
import VideoInfoWriter from "../components/Video/VideoInfoWriter";
import VideoCardRow from "../components/Video/VideoCardRow";
import Title from "../components/Shared/Title";
import PageNotFound from "./PageNotFound";
import { addVideoLocal } from "../utils/localStrorage";
import InputComment from "../components/Comment/InputComment";
import { getCommentApi } from "../api/commentApi";
import CommentList from "../components/Comment/CommentList";
import { descViewApi } from "../api/videoApi";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/Video/VideoPlayer";

const DetailsVideo = () => {
  const { video, loading, videoRecomment, likeCount, disLikeCount, error } =
    useSelector((state) => state.video);
  const { currentTime } = useSelector((state) => state.miniature);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentList, setCommentList] = useState([]);

  const addComment = (comment) => {
    setCommentList([...commentList, comment]);
  };

  const deleteComment = (id) => {
    const newListComment = commentList.filter((p) => p._id !== id);
    setCommentList(newListComment);
  };

  useEffect(() => {
    (async (videoId) => {
      try {
        const res = await getCommentApi(videoId);
        if (res.data.success) {
          setCommentList(res.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    dispatch(getVideoById(id));

    return () => {
      dispatch(clearVideo());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentUser) return dispatch(setIsLike(false));
    dispatch(checkLike(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser) return dispatch(setIsDisLike(false));
    dispatch(checkDisLikeVideo(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    if (video._id) {
      addVideoLocal({
        ...video,
        viewAt: Date.now(),
      });
    }
  }, [video]);

  useEffect(() => {
    descViewApi(id);
  }, [id]);

  if (error) return <PageNotFound />;

  return (
    <div className="text-white flex md:flex-row flex-col">
      <Title
        title={`${video?.title || "ATube - Video sharing website"} | ATube`}
      />
      <div className="w-full md:w-[60%]">
        {video?.videoUrl && (
          <VideoPlayer
            currentTimeOut={currentTime}
            videoId={video?._id}
            url={video?.videoUrl}
            nextVideoId={videoRecomment[0]._id}
          />
        )}

        <VideoInfo
          likeCount={likeCount}
          disLikeCount={disLikeCount}
          video={video}
        />
        <VideoInfoWriter video={video} />
        <InputComment addComment={addComment} />
        <CommentList deleteComment={deleteComment} commentList={commentList} />
      </div>
      <div className="flex-1 md:ml-5 pt-8 md:pt-0 overflow-auto">
        {videoRecomment.length > 1 ? (
          videoRecomment
            ?.filter((p) => p._id !== id)
            .map((p) => (
              <VideoCardRow
                percentImg={"40%"}
                maxlengthTitle={25}
                key={p._id}
                data={p}
              />
            ))
        ) : (
          <div className="flex items-center justify-center py-2">
            No Videos Recomment!
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default DetailsVideo;
