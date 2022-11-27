import React, { useEffect, useState } from "react";
import { searchVideoApi } from "../api/videoApi";
import { useSearchParams } from "../hooks/useSearchParms";
import Title from "../components/Shared/Title";
import VideoCardRow from "../components/Video/VideoCardRow";
import LoadingSpin from "../components/Loading/LoadingSpin";
import NoResults from "../components/Shared/NoResults";
import { Link } from "react-router-dom";
import { searchChannelApi } from "../api/channelApi";
import ChannelCard from "../components/Channel/ChannelCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const type = searchParams.get("type");

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (type === "video") {
        try {
          const res = await searchVideoApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await searchChannelApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    })();
  }, [searchTerm, type]);

  if (loading) return <LoadingSpin />;

  return (
    <>
      <div className="text-white flex items-center mb-5">
        <button className="my-3 flex items-center">
          <i className="bx bx-filter text-2xl mr-2"></i> Loại
        </button>
        <div className="ml-4 flex items-center">
          <Link
            className={`${
              type === "video" ? "bg-red-500" : ""
            } block py-1 px-2 rounded-md`}
            to={`/search?type=video&q=${searchTerm}`}
          >
            Video
          </Link>
          <Link
            to={`/search?type=channel&q=${searchTerm}`}
            className={`${
              type === "channel" ? "bg-red-500" : ""
            } block py-1 px-2 rounded-md ml-3`}
          >
            Channel
          </Link>
        </div>
      </div>
      {results.length > 0 ? (
        <div className="w-full text-white">
          <Title title={`${searchTerm} | ATube - Video sharing website`} />
          {results.map((p) =>
            type === "video" ? (
              <VideoCardRow maxlengthTitle={30} key={p?._id} data={p} />
            ) : (
              <ChannelCard key={p?._id} data={p} />
            )
          )}
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default SearchResults;
