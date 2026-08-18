const CollectionCardSkeleton = () => {
  return (
    <>
      <div className="w-auto h-70 mb-20 mx-3 animate-pulse">
        <div className="w-full h-70 rounded-xl grid grid-cols-2 gap-0.5 overflow-hidden">
          <div className="w-full h-full bg-neutral-200 animate-pulse rounded-l-xl" />

          <div className="w-full h-full">
            <div className="w-full h-[50%] bg-neutral-200 animate-pulse rounded-tr-xl mb-0.5" />

            <div className="w-full h-[49.40%] bg-neutral-200 animate-pulse rounded-br-xl" />
          </div>
        </div>
        <div className="h-6 w-44 bg-neutral-200 rounded-md animate-pulse mt-4" />
        <div className="h-4 w-64 bg-neutral-200 rounded-md animate-pulse mt-2" />
      </div>
    </>
  );
};

export default CollectionCardSkeleton;
