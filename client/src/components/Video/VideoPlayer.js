import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearMiniaturePlayer,
  closeMiniaturePlayer,
  openMiniaturePlayer,
} from "../../redux/slice/miniaturePlayerSlice";
import formatVideoTime from "../../utils/formatVideoTime";

const VideoPlayer = ({ url, nextVideoId, currentTimeOut, isMini, videoId }) => {
  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isSeek, setIsSeek] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const videoContainerRef = useRef(null);

  const { videoId: videoIdStore } = useSelector((state) => state.miniature);

  const dispatch = useDispatch();

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (play) {
      videoRef?.current?.pause();
    } else {
      videoRef?.current?.play();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef?.current?.currentTime);
  };

  const handleToggleMuted = (e) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  const handleSeekTime = (e) => {
    e.stopPropagation();

    const clientX = e?.clientX ? e?.clientX : e?.touches[0]?.clientX;
    const left = progressRef.current?.getBoundingClientRect().left;
    const width = progressRef.current?.getBoundingClientRect().width;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";
    setIsSeek(true);

    if (clientX <= left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(0);
      return;
    }

    if (clientX >= width + left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = videoRef?.current?.duration;
        setCurrentTime(videoRef?.current?.duration);
      }
      return;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.currentTime = percent * videoRef.current?.duration;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      setCurrentTime(percent * videoRef?.current?.duration);
    }

    setIsSeek(false);
  };

  const handleNextVideo = (e) => {
    e.stopPropagation();
    navigate(`/details/${nextVideoId}`);
  };

  const handleToggleFullScreen = () => {
    if (document.fullscreenElement && fullscreen) {
      setFullscreen(false);
      document.exitFullscreen();
    } else {
      setFullscreen(true);
      videoContainerRef?.current?.requestFullscreen();
    }
  };

  const handleToggleControls = () => {
    const videoContainer = videoContainerRef?.current;

    if (videoContainer?.classList?.contains("active-controls")) {
      videoContainer?.classList?.remove("active-controls");
    } else {
      videoContainer?.classList?.add("active-controls");
    }
  };

  const handleOpenMiniaturePlayer = () => {
    dispatch(
      openMiniaturePlayer({ currentTime, videoUrl: url, nextVideoId, videoId })
    );
    navigate("/");
  };

  const handleCloseMiniaturePlayer = () => {
    if (!videoIdStore) return;
    dispatch(closeMiniaturePlayer({ currentTime }));
    navigate(`/details/${videoIdStore}`);
  };

  useEffect(() => {
    progressRef?.current?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", handleSeekTime);
    });

    return () => {
      progressRef?.current?.removeEventListener("mousedown", () => {
        document.addEventListener("mousemove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    document?.addEventListener("mouseup", () => {
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", handleSeekTime);
    });

    return () => {
      document?.removeEventListener("mouseup", () => {
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    progressRef?.current?.addEventListener("touchstart", () => {
      document.addEventListener("touchmove", handleSeekTime);
    });

    return () => {
      progressRef?.current?.removeEventListener("touchstart", () => {
        document.addEventListener("touchmove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    progressRef?.current?.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", handleSeekTime);
    });

    return () => {
      progressRef?.current?.removeEventListener("touchend", () => {
        document.removeEventListener("touchmove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.volume = 0.2;
    }
  }, []);

  useEffect(() => {
    let timeout;

    if (!play || isSeek) {
      return;
    }

    timeout = setTimeout(() => {
      videoContainerRef?.current?.classList?.remove("active-controls");
    }, 6000);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [
    videoContainerRef?.current?.classList?.contains("active-controls"),
    play,
    isSeek,
  ]);

  useEffect(() => {
    if (videoRef !== null && videoRef?.current !== null && currentTimeOut) {
      videoRef.current.currentTime = currentTimeOut;
    }
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/details/")) {
      const videoCurrentId = location.pathname.split("/details/")[1];
      if (videoCurrentId === videoIdStore) {
        handleCloseMiniaturePlayer();
      } else {
        dispatch(clearMiniaturePlayer());
      }
    }
  }, [location.pathname]);

  return (
    <div
      onClick={handleToggleControls}
      ref={videoContainerRef}
      className="w-full aspect-video relative video-container bg-[#111] rounded overflow-hidden"
    >
      <video
        onPause={() => {
          setPlay(false);
          videoContainerRef?.current?.classList?.add("active-controls");
        }}
        onPlay={() => {
          setPlay(true);
        }}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onLoadedMetadata={() => setLoading(true)}
        onLoadedData={() => setLoading(true)}
        onLoad={() => setLoading(true)}
        autoPlay
        muted={muted}
        src={url}
        poster={url.split(".mp4")[0] + ".jpg"}
        ref={videoRef}
        className="w-full h-full"
      />

      {loading && (
        <div className="z-20 absolute inset-0 flex items-center justify-center">
          <CircularProgress color="#fff" />
        </div>
      )}

      <button
        onClick={handleToggleMuted}
        className={`absolute z-10 ${
          isMini ? "m-1" : "m-4"
        } bg-[#333] w-[40px] h-[40px] top-0 left-0 rounded`}
      >
        <i
          className={`bx bx-volume-${
            muted ? "mute" : "full"
          } text-white text-lg`}
        ></i>
      </button>

      {isMini && (
        <button
          onClick={handleCloseMiniaturePlayer}
          className={`absolute z-10 ${
            isMini ? "m-1" : "m-4"
          } bg-[#333] w-[40px] h-[40px] top-0 right-0 rounded`}
        >
          <i className="bx bx-fullscreen text-lg"></i>
        </button>
      )}

      <div className="absolute controls inset-0 transition-colors bg-[#00000099] flex flex-col">
        <div className="flex-1 flex items-center justify-between mx-4 relative">
          <button disabled className="opacity-50">
            <i className="text-[36px] bx bx-skip-previous"></i>
          </button>
          <button onClick={handlePlayPause}>
            {!loading && (
              <i className={`text-[50px] bx bx-${play ? "pause" : "play"}`}></i>
            )}
          </button>
          <button onClick={handleNextVideo}>
            <i className="text-[36px] bx bx-skip-next"></i>
          </button>

          <div className="absolute bottom-0 w-full">
            {!isMini && (
              <div className="flex items-center justify-between w-full mb-1">
                <p className="font-bold text-xs">
                  {formatVideoTime(currentTime)} /{" "}
                  {formatVideoTime(videoRef?.current?.duration)}
                </p>
                <div className="space-x-2">
                  {/* <button className="text-white h-[16px]">
                  <i className="bx bxs-cog"></i>
                </button> */}
                  <button
                    onClick={handleOpenMiniaturePlayer}
                    className="text-white"
                  >
                    <i className="bx bx-minus-back text-lg"></i>
                  </button>
                  <button
                    onClick={handleToggleFullScreen}
                    className="text-white"
                  >
                    <i
                      className={`text-lg bx bx-${
                        fullscreen ? "exit-fullscreen" : "fullscreen"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            )}
            <div
              ref={progressRef}
              onClick={handleSeekTime}
              className="w-full py-3 relative cursor-pointer mb-2"
            >
              <div className="h-[3px] w-full bg-gray-500 relative rounded overflow-hidden">
                <div
                  style={{
                    width: `${
                      (currentTime * 100) / videoRef?.current?.duration
                    }%`,
                  }}
                  className="absolute top-0 left-0 bottom-0 bg-red-500"
                />
              </div>
              <div
                style={{
                  left: `${(currentTime * 100) / videoRef?.current?.duration}%`,
                }}
                className="w-[10px] h-[10px] bg-red-500 rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
