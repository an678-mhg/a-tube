import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  checkSubsrciption,
  setSubsrciptions,
  subsrciptionChannel,
  unSubsrciption,
  getSubsrciption,
} from "../../redux/slice/subsrciptionSlice";
import ModalUpdateUser from "../Modal/ModalUpdateUser";
import ModalAuth from "../Modal/ModalAuth";

const ChannelInfoTop = ({ profile }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { isSubsrciption, subsrciptCount, isCheck } = useSelector(
    (state) => state.sub
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);

  const { id } = useParams();

  const handleSubsrciption = () => {
    if (!currentUser) return setShowModalAuth(true);
    if (isSubsrciption) {
      if (window.confirm("Bạn muốn hủy đăng ký!")) {
        dispatch(unSubsrciption(profile?._id));
      }
    } else {
      dispatch(subsrciptionChannel({ channelId: profile?._id }));
    }
  };

  useEffect(() => {
    if (!currentUser) return dispatch(setSubsrciptions(false));
    if (currentUser._id === profile?._id) return;
    if (!profile?._id) return;
    dispatch(checkSubsrciption(profile?._id));
  }, [id, currentUser, profile?._id, dispatch]);

  useEffect(() => {
    if (!profile?._id) return;
    dispatch(getSubsrciption(profile?._id));
  }, [profile?._id, dispatch]);

  return (
    <div className="bg-[#222]">
      <div className="p-4">
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center md:flex-row flex-col">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={profile?.avatar}
                alt={"avatar"}
              />
            </div>
            <div className="md:ml-4 ml-0 md:mt-0 mt-3 text-center lg:text-left">
              <p>{profile?.name}</p>
              <p className="text-[#999] text-sm">
                {subsrciptCount} người đăng ký
              </p>
            </div>
          </div>
          {currentUser?._id !== profile?._id ? (
            <button
              disabled={isCheck}
              onClick={handleSubsrciption}
              className={`mt-3 md:mt-0 py-2 px-3 ${
                isSubsrciption ? "bg-[#ffffff1a]" : "bg-red-500"
              } rounded-sm ${
                isCheck ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSubsrciption ? "Đã đăng ký" : "Đăng ký"}
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={() => setShow(true)}
                className="mt-3 md:mt-0 py-2 px-3 rounded-sm bg-blue-500 mr-4"
              >
                Tùy chỉnh kênh
              </button>
              <Link
                to="videos"
                className="mt-3 md:mt-0 py-2 px-3 rounded-sm bg-blue-500 block"
              >
                Quản lí video
              </Link>
            </div>
          )}
        </div>

        {show && <ModalUpdateUser setShow={setShow} />}
        {showModalAuth && <ModalAuth setShow={setShowModalAuth} />}
      </div>
    </div>
  );
};

export default ChannelInfoTop;
