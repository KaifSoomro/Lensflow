import React from "react";

const ImageCardSkeleton = () => {
  return (
    <div className="relative mb-7 w-full overflow-hidden border border-neutral-300 break-inside-avoid animate-pulse">
      <div className="w-full h-105 bg-neutral-200" />

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex justify-end gap-3">
          <div className="w-11 h-11 rounded-md bg-neutral-300" />
          <div className="w-11 h-11 rounded-md bg-neutral-300" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-300" />

            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-neutral-300" />
              <div className="h-3 w-24 rounded bg-neutral-300" />
            </div>
          </div>
          <div className="w-11 h-11 rounded-md bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};

export default ImageCardSkeleton;
