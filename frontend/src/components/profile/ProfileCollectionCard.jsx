import React from "react";

const ProfileCollectionCard = ({ collection }) => {
  return (
    <div className="w-110 h-75 bg-neutral-200 rounded-xl grid grid-cols-2 gap-0.5">
      <div className="w-full h-full rounded-l-xl overflow-hidden">
        <img
          src={collection?.photos[0]?.cardImage || ""}
          alt="image-01"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full  rounded-r-xl">
        <div className="w-full h-[50%] rounded-tr-xl overflow-hidden">
          <img
            src={collection?.photos[1]?.cardImage || ""}
            alt="image-01"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[50%] rounded-br-xl overflow-hidden">
          <img
            src={collection?.photos[2]?.cardImage || ""}
            alt="image-01"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCollectionCard;
