import React from "react";

const ProfileInfoSkeleton = () => {
  return (
    <div className="w-full h-70 p-10 flex items-start justify-center border-b border-neutral-300 animate-pulse">
      <div className="flex items-start justify-center gap-15">
        <div>
          <div className="w-40 h-40 rounded-full bg-neutral-200"></div>
        </div>

        <div>
          <div className="flex items-center gap-5">
            <div className="h-10 w-60 bg-neutral-200 rounded-md"></div>

            <div className="h-10 w-36 bg-neutral-200 rounded-lg border border-neutral-300"></div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-4 w-105 bg-neutral-200 rounded"></div>
            <div className="h-4 w-75 bg-neutral-200 rounded"></div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-200"></div>
            <div className="h-4 w-48 bg-neutral-200 rounded"></div>
            <div className="h-4 w-16 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSkeleton;