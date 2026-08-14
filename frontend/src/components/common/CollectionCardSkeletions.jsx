import React from "react";

const CollectionCardSkeletions = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="mt-5 w-full flex items-center justify-between px-3 py-2 rounded-md"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded bg-neutral-200 animate-pulse" />

            <div className="space-y-2">
              <div className="h-5 w-36 bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      ))}
    </>
  );
};

export default CollectionCardSkeletions;
