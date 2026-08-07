import React from "react";

const SinglePhotoSkeleton = () => {
  return (
    <div className="w-full px-10 animate-pulse">
      <div className="w-full h-15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-200" />

          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-neutral-200" />
            <div className="h-3 w-24 rounded bg-neutral-200" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-200" />
          <div className="w-10 h-10 rounded-lg bg-neutral-200" />

          <div className="flex items-center gap-0.5">
            <div className="w-32 h-10 rounded-l-lg bg-neutral-200" />
            <div className="w-12 h-10 rounded-r-lg bg-neutral-200" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="w-200 h-125 rounded-lg bg-neutral-200" />
      </div>

      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-25">
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-12 rounded bg-neutral-200" />
            <div className="h-5 w-8 rounded bg-neutral-200" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-20 rounded bg-neutral-200" />
            <div className="h-5 w-8 rounded bg-neutral-200" />
          </div>
        </div>

        <div className="h-4 w-40 rounded bg-neutral-200" />
      </div>

      <div className="mt-10 flex items-center gap-4">
        <div className="h-7 w-16 rounded-lg bg-neutral-200" />
        <div className="h-7 w-20 rounded-lg bg-neutral-200" />
        <div className="h-7 w-14 rounded-lg bg-neutral-200" />
        <div className="h-7 w-24 rounded-lg bg-neutral-200" />
      </div>
    </div>
  );
};

export default SinglePhotoSkeleton;
