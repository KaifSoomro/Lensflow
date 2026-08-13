import React from "react";
import { BsLockFill, BsPlusCircleFill } from "react-icons/bs";

const CollectionCard = ({ collection }) => {
  return (
    <button className="mt-5 w-full flex items-center justify-between hover:bg-neutral-100 px-3 py-2 rounded-md group cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="w-14 rounded overflow-hidden">
          <img
            src={collection?.photos[0]?.cardImage}
            alt="collection-img-01"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            {collection?.collectionName}
          </h1>
          <span className="flex items-center gap-2 mt-1.5 text-neutral-500">
            {collection?.private ? <BsLockFill /> : ""}
            {collection?.photos.length === 1 ? `${collection?.photos.length} image` : `${collection?.photos.length} images`}
          </span>
        </div>
      </div>
      <div className="hidden group-hover:block">
        <BsPlusCircleFill size={25} />
      </div>
    </button>
  );
};

export default CollectionCard;
