import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Overlay from "./Overlay";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatedUser } from "../../redux/slice/channelSlice";
import { uploadImg } from "../../utils/uploadImg";
import Loading from "../Loading/Loading";

const ModalUpdateUser = ({ setShow }) => {
  const { profile } = useSelector((state) => state.channel);
  const [previewAvatar, setPreviewAvatar] = useState(profile?.avatar);
  const [previewBackground, setPreviewBackground] = useState(
    profile?.background
  );
  const [data, setData] = useState({
    name: profile.name,
    description: profile.description,
  });
  const [avatar, setAvatar] = useState();
  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file.size / 1000000 > 5)
      return toast.error("File ảnh ko được vượt quá 5 MB!");
    const preview = URL.createObjectURL(file);
    setPreviewAvatar(preview);
    setAvatar(file);
  };

  const handleChangeBg = (e) => {
    const file = e.target.files[0];
    if (file.size / 1000000 > 5)
      return toast.error("File ảnh ko được vượt quá 5 MB!");
    const preview = URL.createObjectURL(file);
    setPreviewBackground(preview);
    setBg(file);
  };

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);

  useEffect(() => {
    return () => {
      previewBackground && URL.revokeObjectURL(previewBackground);
    };
  }, [previewBackground]);

  const handleUpdated = async (e) => {
    e.preventDefault();
    if (
      previewAvatar === profile.avatar &&
      previewBackground === profile.background &&
      data.name === profile.name &&
      data.description === profile.description
    )
      return setShow(false);

    if (!data.name.trim() || !data.description.trim()) {
      return toast.error("Không được để chống name và email!");
    }

    if (data.name.trim().length > 20 || data.name.trim().length < 6) {
      return toast.warn("Tên không đc ít hơn 4 kí tự và vượt quá 20 kí tự!");
    }

    if (data.description.trim().length > 75) {
      return toast.warn("Mô tả kênh của bạn không đc vượt quá 75 kí tự!");
    }

    setLoading(true);

    if (!avatar && !bg) {
      dispatch(updatedUser(data));
    }

    if (avatar && !bg) {
      const url = await uploadImg(avatar);
      dispatch(
        updatedUser({
          ...data,
          avatar: url,
        })
      );
    }

    if (bg && !avatar) {
      const url = await uploadImg(bg);
      dispatch(
        updatedUser({
          ...data,
          background: url,
        })
      );
    }

    if (bg && avatar) {
      const files = [bg, avatar];
      const url = await Promise.all(files.map(async (p) => await uploadImg(p)));
      dispatch(
        updatedUser({
          ...data,
          background: url[0],
          avatar: url[1],
        })
      );
    }

    setShow(false);
    setLoading(false);
    return toast.success("Tùy chỉnh kênh thành công");
  };
  return (
    <Overlay setShow={setShow}>
      <form
        onSubmit={handleUpdated}
        className="text-white bg-[#333] w-[500px] max-w-[calc(100%-32px)] modal-animation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-[16/5] relative">
          <img className="w-full h-full object-cover" src={previewBackground} />
          <label
            htmlFor="file-bg"
            className="transition-opacity absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black opacity-50"
          >
            <i className="bx bx-cloud-upload text-2xl text-white"></i>
          </label>
          <input
            type={"file"}
            accept="image/*"
            id="file-bg"
            hidden
            onChange={handleChangeBg}
          />
        </div>
        <div className="p-4 text-center w-full">
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full mt-4 mx-auto relative">
            <img className="w-full h-full object-cover" src={previewAvatar} />
            <label
              htmlFor="file-avatar"
              className="transition-opacity absolute top-0 bottom-0 right-0 left-0 items-center flex justify-center bg-black opacity-50"
            >
              <i className="bx bx-cloud-upload text-2xl text-white"></i>
            </label>
            <input
              type={"file"}
              id="file-avatar"
              hidden
              accept="image/*"
              onChange={handleChangeAvatar}
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block w-full text-left">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="py-1 px-3 rounded-sm w-full bg-[#222] text-white outline-none"
              onChange={handleChange}
              value={data.name}
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block w-full text-left">Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="py-1 px-3 rounded-sm w-full bg-[#222] text-white outline-none"
              onChange={handleChange}
              value={data.description}
              rows="4"
            />
          </div>
          <div className="mt-4">
            <button className="py-2 px-3 rounded-sm w-full bg-red-500 text-white">
              Updated
            </button>
          </div>
        </div>
      </form>

      {loading && <Loading />}
    </Overlay>
  );
};

export default ModalUpdateUser;
