import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound";
import {
  checkSubsrciption,
  getSubsrciption,
  setSubsrciptions,
  subsrciptionChannel,
  unSubsrciption,
} from "../../redux/slice/subsrciptionSlice";
import ModalAuth from "../Modal/ModalAuth";
import VideoDesc from "./VideoDesc";

const VideoInfoWriter = ({ video }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { subsrciptCount, isSubsrciption, error, isCheck } = useSelector(
    (state) => state.sub
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!video?.writer?._id) return;
    dispatch(getSubsrciption(video?.writer?._id));
  }, [video?.writer?._id, dispatch]);

  useEffect(() => {
    if (!currentUser || !video?.writer?._id)
      return dispatch(setSubsrciptions(false));
    dispatch(checkSubsrciption(video?.writer?._id));
  }, [currentUser, video?.writer?._id, dispatch]);

  const handleSubsrciption = () => {
    if (!currentUser) return setShow(true);
    if (isSubsrciption) {
      if (window.confirm("Bạn muốn hủy đăng ký!")) {
        dispatch(unSubsrciption(video?.writer?._id));
      }
    } else {
      dispatch(subsrciptionChannel({ channelId: video?.writer?._id }));
    }
  };

  if (error) return <PageNotFound />;

  return (
    <div className="border-t border-[#999] mt-2 border-b pb-4">
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to={`/channel/${video?.writer?._id}`}
              className="w-[50px] h-[50px] rounded-full overflow-hidden block"
            >
              <img
                className="w-full h-full object-cover"
                src={video?.writer?.avatar}
                alt="img"
              />
            </Link>
            <div className="ml-4">
              <Link
                to={`/channel/${video?.writer?._id}`}
                className="font-semibold text-sm mb-2 block"
              >
                {video?.writer?.name}
              </Link>
              <p className="text-gray-300 text-xs">
                {subsrciptCount} người đăng ký
              </p>
            </div>
          </div>
          {currentUser?._id !== video?.writer?._id && (
            <>
              <button
                className={`py-2 text-sm px-6 ${
                  isSubsrciption
                    ? "bg-[#ffffff1a] text-white"
                    : "bg-[#f1f1f1] text-black"
                } rounded-full ${
                  isCheck ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleSubsrciption}
                disabled={isCheck}
              >
                {isSubsrciption ? "Đã đăng ký" : "Đăng ký"}
              </button>
            </>
          )}
        </div>
      </div>

      <VideoDesc description={video?.description} />

      {show && <ModalAuth setShow={setShow} />}
    </div>
  );
};

export default VideoInfoWriter;
