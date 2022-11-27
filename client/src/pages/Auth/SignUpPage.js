import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SignUpForm from "../../components/Auth/SIgnUpForm";
import Title from "../../components/Shared/Title";
import { useSearchParams } from "../../hooks/useSearchParms";

const SignUpPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();

  if (currentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="text-white py-4 w-full h-screen flex items-center justify-center">
      <Title title={"Sign-Up | ATube - Video sharing website"} />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
