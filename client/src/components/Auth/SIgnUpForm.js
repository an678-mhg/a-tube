import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfoApi, registerUserApi } from "../../api/authApi";
import { addUser } from "../../redux/slice/authSlice";
import setAuthToken from "../../utils/setAuthToken";
import Loading from "../Loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      comfirm_password: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      try {
        const res = await registerUserApi(value);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setAuthToken(res.data.token);
          const userInfo = await getUserInfoApi();
          dispatch(addUser(userInfo.data.user));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Trường này là bắt buộc!")
        .min(6, "Tên phải có ít nhất 6 kí tự!")
        .max(20, "Tên không đc vượt quá 20 kí tự!"),
      email: Yup.string()
        .required("Trường này là bắt buộc!")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng!"
        ),
      password: Yup.string()
        .max(10, "Mật khẩu không đc vượt quá 10 kí tự!")
        .required("Trường này là bắt buộc!")
        .min(6, "Mật khẩu có ít nhất 6 kí tự!"),
      comfirm_password: Yup.string()
        .required("Trường này là bắt buộc!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!"),
    }),
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[500px] bg-[#222] rounded-md p-4 max-w-[calc(100%-16px)]"
    >
      <h1 className="text-[20px] font-semibold">Đăng ký</h1>
      <div className="w-full mt-4">
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your name</label>
          <input
            placeholder="EX: Nguyen Quoc An"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.name}
            name="name"
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <p className="text-xs text-red-500 mt-2">{formik.errors.name}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your email</label>
          <input
            placeholder="EX: an567008@gmail.com"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.email}
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="text-xs text-red-500 mt-2">{formik.errors.email}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your password</label>
          <div className="relative">
            <input
              placeholder="EX: 12345678"
              className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
              value={formik.password}
              name="password"
              onChange={formik.handleChange}
              type={showPass ? "text" : "password"}
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-[50%] translate-x-[-50%] translate-y-[-50%] right-0"
            >
              <i
                class={`${showPass ? "bx bx-hide" : "bx bx-show"} text-2xl`}
              ></i>
            </div>
          </div>

          {formik.errors.password && (
            <p className="text-xs text-red-500 mt-2">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">
            Enter your comfirm password
          </label>
          <input
            placeholder="EX: 12345678"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.comfirm_password}
            name="comfirm_password"
            onChange={formik.handleChange}
            type={showPass ? "text" : "password"}
          />
          {formik.errors.comfirm_password && (
            <p className="text-xs text-red-500 mt-2">
              {formik.errors.comfirm_password}
            </p>
          )}
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="py-2 px-3 bg-red-500 text-white rounded-sm w-full"
          >
            Đăng ký
          </button>
        </div>
        <p className="mt-4 text-right text-[14px]">
          Nếu bạn đã có tài khoản hãy{" "}
          <Link className="text-blue-500" to="/sign-in">
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="border-t border-red-500 mt-4 pt-4">
        <button>
          <Link to="/">Quay lại trang chủ!</Link>
        </button>
      </div>

      {loading && <Loading />}
    </form>
  );
};

export default SignUpForm;
