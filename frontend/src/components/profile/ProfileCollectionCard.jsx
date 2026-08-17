import React from "react";
import { BsLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProfileCollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/profile/${collection?.user?._id}/collections/${collection?._id}`}
      className="w-110 h-95 rounded-xl grid grid-cols-2 gap-0.5 relative"
    >
      <div className="absolute top-0 left-0 z-20 w-full h-full hover:bg-white/8 transition-all ease"></div>
      <div className="w-full h-full rounded-l-xl overflow-hidden bg-neutral-200">
        {collection?.photos[0]?.cardImage && (
          <img
            src={collection?.photos[0]?.cardImage}
            alt="image-01"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="w-full h-full rounded-r-xl">
        <div className="w-full h-[50%] rounded-tr-xl overflow-hidden mb-0.5 bg-neutral-200">
          {collection?.photos[1]?.cardImage && (
            <img
              src={collection?.photos[0]?.cardImage}
              alt="image-01"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="w-full h-[49.40%] rounded-br-xl overflow-hidden bg-neutral-200">
          {collection?.photos[2]?.cardImage && (
            <img
              src={collection?.photos[0]?.cardImage}
              alt="image-01"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <h1 className="capitalize font-semibold text-lg mt-4 flex items-center gap-2">
          {collection?.private && <BsLockFill size={11} />}{" "}
          {collection?.collectionName}
        </h1>
        <h2 className="text-sm text-neutral-500 mt-1">
          {collection?.photos.length === 1
            ? `${collection?.photos.length} image `
            : `${collection?.photos.length} images `}
            <span>
              · Curated by { collection?.user?.fullName }
            </span>
        </h2>
      </div>
    </Link>
  );
};

export default ProfileCollectionCard;
