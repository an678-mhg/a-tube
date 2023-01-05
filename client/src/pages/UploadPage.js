import React, { useEffect, useState } from "react";
import { cloudinaryUrl } from "../utils/cloudinaryApi";
import axios from "axios";
import { uploadVideoApi } from "../api/videoApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Title from "../components/Shared/Title";
import { useSelector } from "react-redux";
import WantLogin from "../components/Shared/WantLogin";

const UploadPage = () => {
  const [file, setFile] = useState();
  const [previewVideo, setPreviewVideo] = useState();
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleOnchangeFile = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "video/mp4")
      return toast.error("Vui lòng chọn file định dạng video mp4!");
    if (file?.size / 1024 / 1024 > 30)
      return toast.error("Dung lượng file phải bé hơn 30mb!");

    const preview = URL.createObjectURL(file);
    setPreviewVideo(preview);
    setFile(e.target.files[0]);
  };

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      previewVideo && URL.revokeObjectURL(previewVideo);
    };
  }, [previewVideo]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!data.title.trim() || !data.description.trim())
      return toast.error("Không được để trống các trường!");
    if (data.title.trim().length > 100)
      return toast.error("Tiêu đề video không được dài quá 100 kí tự!");
    if (!file) return toast.error("Bạn chưa chọn video nào!");

    URL.revokeObjectURL(previewVideo);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);

      const toastId = toast.loading("Upload...", { position: "bottom-right" });

      const res = await axios.post(cloudinaryUrl, formData, {
        onUploadProgress: (p) => {
          const { loaded, total } = p;
          let percent = Math.floor((loaded * 100) / total);
          toast.loading(`Upload video ${percent}`, { toastId: toastId });
        },
      });

      const newVideo = {
        ...data,
        videoUrl: res.data.url,
      };

      const uploadVideo = await uploadVideoApi(newVideo);

      toast.dismiss(toastId);

      if (uploadVideo.data.success) {
        navigate(`/details/${uploadVideo.data.video?._id}`);
        toast.success(uploadVideo.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("upload video fail!");
    }
    setLoading(false);
  };

  return (
    <>
      {currentUser ? (
        <>
          <form onSubmit={handleSubmitForm} className="text-white">
            <Title
              title={"Upload a new video | ATube - Video sharing website"}
            />
            <div className="flex items-center border md:flex-row flex-col rounded-sm bg-[#111]">
              <label
                htmlFor="file-upload"
                className="md:w-[50%] w-full aspect-[16/9] flex items-center justify-center border-r"
              >
                <i className="text-[60px] bx bx-plus"></i>
                <input
                  type="file"
                  id="file-upload"
                  hidden
                  onChange={handleOnchangeFile}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              </label>
              {previewVideo && (
                <video
                  controls
                  src={previewVideo}
                  className="md:w-[50%] w-full aspect-[16/9]"
                />
              )}
            </div>
            <div className="mt-4">
              <div>
                <label className="block my-2">Tiêu đề</label>
                <input
                  className="px-3 py-1 w-full bg-[#222] rounded-sm outline-none"
                  placeholder="Tiêu đề..."
                  name="title"
                  onChange={handleChangeInput}
                  value={data.title}
                />
              </div>
              <div>
                <label className="block my-2">Mô tả</label>
                <textarea
                  className="px-3 py-1 w-full bg-[#222] rounded-sm outline-none"
                  placeholder="Mô tả..."
                  name="description"
                  rows={5}
                  value={data.description}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="my-4">
                <button
                  disabled={loading}
                  className="px-3 py-2 bg-blue-500 rounded-sm text-white w-full"
                >
                  Tải lên video
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <WantLogin />
      )}
    </>
  );
};

export default UploadPage;
