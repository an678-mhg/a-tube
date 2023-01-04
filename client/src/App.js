import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { getUserInfoApi } from "./api/authApi";
import Loading from "./components/Loading/Loading";
import ClientPage from "./pages/Client/ClientPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import { addUser, logOut } from "./redux/slice/authSlice";
import setAuthToken from "./utils/setAuthToken";
import VideoPlayer from "./components/Video/VideoPlayer";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { isShow, currentTime, videoUrl, nextVideoId } = useSelector(
    (state) => state.miniature
  );

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("token") === "null") {
      dispatch(logOut());
    } else {
      setAuthToken(localStorage.getItem("token"));
      (async () => {
        try {
          const res = await getUserInfoApi();
          if (res.data.success) {
            dispatch(addUser(res.data.user));
          }
        } catch (error) {
          dispatch(logOut());
        }
      })();
    }
  }, [dispatch]);

  if (typeof currentUser === "undefined") return <Loading />;

  return (
    <div>
      <Routes>
        <Route path="/*" element={<ClientPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      {isShow && (
        <div className="fixed w-[300px] text-white bottom-0 right-0 m-4">
          <VideoPlayer
            isMini={true}
            currentTimeOut={currentTime}
            url={videoUrl}
            nextVideoId={nextVideoId}
          />
        </div>
      )}
    </div>
  );
}

export default App;
