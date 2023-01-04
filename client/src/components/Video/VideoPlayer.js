import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useNavigate } from "react-router-dom";
import formatVideoTime from "../../utils/formatVideoTime";

const VideoPlayer = ({ url, nextVideoId }) => {
  const [muted, setMuted] = useState(true);
  const [play, setPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const videoContainerRef = useRef(null);

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

  const handleSeekTime = (e) => {
    e.stopPropagation();

    const clientX = e.clientX;
    const left = progressRef.current?.getBoundingClientRect().left;
    const width = progressRef.current?.getBoundingClientRect().width;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";
    videoContainerRef?.current?.classList.add("active-controls");

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
  };

  const handleNextVideo = (e) => {
    e.stopPropagation();
    navigate(`/details/${nextVideoId}`);
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
      videoContainerRef?.current?.classList.remove("active-controls");
    });

    return () => {
      document?.removeEventListener("mouseup", () => {
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleSeekTime);
        videoContainerRef?.current?.classList.remove("active-controls");
      });
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className="w-full aspect-video relative video-container bg-[#111] rounded overflow-hidden"
    >
      <video
        onPause={() => {
          setPlay(false);
          videoContainerRef?.current?.classList.add("active-controls");
        }}
        onPlay={() => {
          setPlay(true);
        }}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onLoadedMetadata={() => setLoading(true)}
        autoPlay
        muted={muted}
        src={url}
        poster={url.split(".mp4")[0] + ".jpg"}
        ref={videoRef}
        className="w-full h-full"
      />

      {muted && (
        <button
          onClick={() => {
            setMuted(false);
          }}
          className="absolute z-10 bg-[#333] md:w-[50px] md:h-[50px] w-[40px] h-[40px] top-0 left-0 md:m-4 m-2 rounded"
        >
          <i className="bx bx-volume-mute text-white md:text-2xl text-lg"></i>
        </button>
      )}

      <div className="absolute controls inset-0 transition-colors bg-[#00000099] flex flex-col">
        <div className="flex-1 flex items-center justify-between mx-4 relative">
          <button disabled className="opacity-50">
            <i className="text-[36px] bx bx-skip-previous"></i>
          </button>
          <button onClick={handlePlayPause}>
            {loading ? (
              <div>
                <CircularProgress color="#fff" />
              </div>
            ) : (
              <i className={`text-[50px] bx bx-${play ? "pause" : "play"}`}></i>
            )}
          </button>
          <button onClick={handleNextVideo}>
            <i className="text-[36px] bx bx-skip-next"></i>
          </button>

          <div className="absolute bottom-0 w-full">
            <div className="flex items-center justify-between w-full mb-1">
              <p className="font-bold text-xs">
                {formatVideoTime(currentTime)} /{" "}
                {formatVideoTime(videoRef?.current?.duration)}
              </p>
              <button className="text-white h-[16px]">
                <i className="bx bx-fullscreen"></i>
              </button>
            </div>
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
