import React from "react";
import Image from "../../assets/images/image-not-found.png";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const DownloadHistoryCard = ({ value, user }) => {
  const userPhotoUrl = `${user?.fullName.split(" ").join("-")}-${value?._id}-lensflow.jpg`;

  return (
    <Link
      to={`/photo/${value?._id}`}
      className="w-50 h-50 cursor-zoom-in relative group"
    >
      <div className="w-full h-full absolute top-0 group-hover:bg-black/10 z-40 transition-all ease"></div>
      <img
        src={value?.cardImage || Image}
        alt={"image-not-found"}
        className="w-full h-full object-cover"
      />
      <h3 className="text-sm mt-1.5 capitalize">{user?.fullName}</h3>
      <div className="flex items-center gap-1 mt-0.5">
        <ImageIcon size={15} className="text-neutral-400" />
        <p className="text-neutral-500 text-xs">
          {userPhotoUrl.slice(0, 28)}...
        </p>
      </div>
    </Link>
  );
};

export default DownloadHistoryCard;
