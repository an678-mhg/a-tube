import InfinityLoadPage from "../../components/Shared/InfinityLoadPage";
import { getVideoSubsrciption } from "../../redux/slice/infinityLoadSlice";
import { useState } from "react";
import Title from "../../components/Shared/Title";
import WantLogin from "../../components/Shared/WantLogin";
import { useSelector } from "react-redux";

const SubsrciptionPage = () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) return <WantLogin />;

  return (
    <>
      <Title title={"Subsrciption | ATube - Video sharing website"} />
      <InfinityLoadPage
        page={page}
        setPage={setPage}
        functionGetData={getVideoSubsrciption}
      />
    </>
  );
};

export default SubsrciptionPage;
