import React from "react";

const SkeletonCard = () => {
  return (
    <div>
      <div className="aspect-[16/9] bg-[#222] rounded-md">
        <div className="h-full skeleton"></div>
        <div className="px-2 py-3 flex justify-between h-[80px]">
          <div className="w-[35px] h-[35px] rounded-full overflow-hidden mt-2 skeleton"></div>
          <div className="ml-2 flex-1 flex flex-col items-start justify-start">
            <p className="text-[16px] hover:underline skeleton skeleton-text w-full"></p>
            <p className="text-[16px] hover:underline skeleton skeleton-text w-[80%]"></p>
            <div className="w-full">
              <p className="text-xs mt-1 skeleton skeleton-text w-[40%]"></p>
              <div className="flex items-center mt-1">
                <p className="text-xs text-gray-100 flex items-center skeleton skeleton-text w-[100%]"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
