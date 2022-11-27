import React from "react";
import GridLayout from "../Shared/GridLayout";
import SkeletonCard from "./SkeletonCard";

const SkeletonVideoCard = ({ item }) => {
  const arrayNumber = Array.from(Array(item).keys());

  return (
    <GridLayout>
      {arrayNumber.map((p) => (
        <SkeletonCard key={p} />
      ))}
    </GridLayout>
  );
};

export default SkeletonVideoCard;
