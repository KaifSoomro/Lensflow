import React from "react";
import { Link } from "react-router-dom";

const ProfileCollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/profile/${collection?.user}/collections/${collection?._id}`}
      className="w-110 h-75 rounded-xl grid grid-cols-2 gap-0.5"
    >
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
    </Link>
  );
};

export default ProfileCollectionCard;
