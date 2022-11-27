import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteVideo } from "../../redux/slice/channelSlice";
import { calculateCreatedTime } from "../../utils/formatDate";
import ModalEditVideo from "../Modal/ModalEditVideo";
import ImageFade from "../Shared/ImgFade";

const VideoCard = ({ data, edit }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleDeleteVideo = () => {
    if (window.confirm("Bạn chắc chắn muốn xóa video này")) {
      dispatch(deleteVideo(data?._id));
      toast.success("Xóa video thành công!");
    }
  };

  return (
    <div>
      <div>
        <Link
          to={`/details/${data?._id}`}
          className="block aspect-video bg-[#333] rounded-md overflow-hidden"
        >
          <ImageFade
            alt={data?.title}
            className="w-full h-full object-cover"
            lazy_src={
              data?.videoThumnail
                ? data?.videoThumnail
                : data?.videoUrl?.replace(".mp4", ".jpg")
            }
          />
        </Link>
        {edit && (
          <div className="w-full bg-red-500 px-3 flex items-center justify-between">
            <button onClick={() => setShow(true)} className="p-1">
              <i className="text-xl bx bx-pencil"></i>
            </button>
            <button onClick={handleDeleteVideo} className="p-1">
              <i className="text-xl bx bx-trash"></i>
            </button>
          </div>
        )}
        <div className="p-4 flex items-start justify-between">
          <Link
            to={`/channel/${data?.writer?._id}`}
            className="w-[35px] h-[35px] rounded-full overflow-hidden block"
          >
            <img
              alt={data?.writer?.name}
              className="w-full h-full object-cover"
              src={data?.writer?.avatar}
            />
          </Link>
          <div className="ml-5 flex-1 flex flex-col items-start justify-start">
            <Link to={`/details/${data?._id}`}>
              <p className="text-[14px] hover:underline font-semibold line-clamp-2">
                {data?.title}
              </p>
            </Link>
            <div>
              <p className="text-xs text-gray-300 mt-2">{data?.writer?.name}</p>
              <div className="flex items-center mt-1">
                <p className="text-xs text-gray-100 flex items-center">
                  {data?.totalView} lượt xem{" "}
                  <i className="bx bx-radio-circle mx-1"></i>
                  {calculateCreatedTime(data.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {show && <ModalEditVideo video={data} setShow={setShow} />}
    </div>
  );
};

export default VideoCard;
