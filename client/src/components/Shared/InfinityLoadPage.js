import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import GridLayout from "./GridLayout";
import VideoCard from "../Video/VideoCard";
import { clearData } from "../../redux/slice/infinityLoadSlice";
import PageNotFound from "../../pages/PageNotFound";
import NoResults from "./NoResults";
import SkeletonVideoCard from "../Skeleton/SkeletonVideoCard";
import { Spin } from "react-cssfx-loading/lib";

const InfinityLoadPage = ({ page, setPage, functionGetData }) => {
  const { data, totalPage, error } = useSelector((state) => state.infinity);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(functionGetData(page));
      setLoading(false);
    })();

    return () => {
      dispatch(clearData());
    };
  }, []);

  useEffect(() => {
    if (page === 1) return;
    dispatch(functionGetData(page));
  }, [page]);

  if (loading) return <SkeletonVideoCard item={12} />;

  if (error) return <PageNotFound />;

  return (
    <>
      {data.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.length}
          hasMore={page < totalPage}
          next={() => setPage((prev) => prev + 1)}
          loader={
            <div className="py-4 w-full flex justify-center">
              <Spin />
            </div>
          }
          height={`calc(100vh - 65px)`}
        >
          <GridLayout>
            {data.map((p) => (
              <VideoCard key={p._id} data={p} />
            ))}
          </GridLayout>
        </InfiniteScroll>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default InfinityLoadPage;
