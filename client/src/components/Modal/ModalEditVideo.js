import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editVideo } from "../../redux/slice/channelSlice";
import Overlay from "../Modal/Overlay";
import { uploadImg } from "../../utils/uploadImg";
import Loading from "../Loading/Loading";

const ModalEditVideo = ({ setShow, video }) => {
  const [data, setData] = useState(video);
  const [files, setFiles] = useState();
  const [previewThumnail, setPreviewThumnail] = useState(
    data?.videoThumnail
      ? data?.videoThumnail
      : data?.videoUrl?.replace(".mp4", ".jpg")
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditVideo = async (e) => {
    e.preventDefault();

    if (
      data.title === video.title &&
      data.description === video.description &&
      !files
    ) {
      return setShow(false);
    }

    if (!data.title.trim() || !data.description.trim()) {
      return toast.error("Không đc để trống các trường!");
    }

    if (data.title.trim().length > 100) {
      return toast.error(
        "Tiêu đề video ko đc vướt quá 76 kí tự và mô tả ko đc vượt quá 100 kí tự!"
      );
    }

    setLoading(true);

    if (!files) {
      dispatch(
        editVideo({
          id: video._id,
          data,
        })
      );
    }

    if (files) {
      const url = await uploadImg(files);
      dispatch(
        editVideo({
          id: video._id,
          data: {
            ...data,
            videoThumnail: url,
          },
        })
      );
    }

    setShow(false);
    setLoading(false);
    return toast.success("Chỉnh sửa video thành công!");
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewThumnail(preview);
    setFiles(file);
  };

  useEffect(() => {
    return () => {
      previewThumnail && URL.revokeObjectURL(previewThumnail);
    };
  }, [previewThumnail]);

  return (
    <Overlay setShow={setShow}>
      <form
        onSubmit={handleEditVideo}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#222] w-[400px] max-w-[calc(100%-32px)] p-4 modal-animation"
      >
        <div className="w-full aspect-[16/9] mb-4 relative">
          <label
            htmlFor="thumnail"
            className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black opacity-50"
          >
            <i className="bx bx-cloud-upload text-2xl text-white"></i>
          </label>
          <img
            className="w-full h-full object-cover"
            alt="image"
            src={previewThumnail}
          />
          <input
            type={"file"}
            accept="image/*"
            hidden
            id="thumnail"
            onChange={onChangeFile}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            className="px-3 py-2 bg-[#111] outline-none rounded-sm w-full"
            value={data?.title}
            name="title"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="px-3 py-2 bg-[#111] outline-none rounded-sm w-full"
            value={data?.description}
            rows={4}
            name="description"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-4">
          <button className="px-3 py-2 outline-none rounded-sm w-full bg-red-500">
            Updated Video
          </button>
        </div>
      </form>

      {loading && <Loading />}
    </Overlay>
  );
};

export default ModalEditVideo;
