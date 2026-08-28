import React from "react";

const DownloadHistoryCardSkeleton = () => {
  return [1, 2, 3, 4, 5, 6].map((index) => (
    <div className="w-50 h-50 relative" key={index}>
      <div className="w-full h-full bg-neutral-200 animate-pulse rounded-sm" />

      <div className="h-4 w-28 bg-neutral-200 animate-pulse rounded mt-1.5" />

      <div className="flex items-center gap-1 mt-1">
        <div className="w-3.5 h-3.5 bg-neutral-200 animate-pulse rounded" />
        <div className="h-3 w-24 bg-neutral-200 animate-pulse rounded" />
      </div>
    </div>
  ));
};

export default DownloadHistoryCardSkeleton;
