import React from "react";
import Image from "../../assets/images/profile.webp";
import { Link } from "react-router-dom";
import { Pencil, XCircle } from "lucide-react";

const ProfileInfo = () => {
  return (
    <div className="w-full h-70 p-10 flex items-start justify-center border-b border-neutral-300">
      <div className="flex items-start justify-center gap-15">
        <div>
          <img src={Image} alt="profile-img" className="w-40" />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <h1 className="font-bold text-4xl text-neutral-900">kaif soomro</h1>
            <Link
              to="/settings"
              className={`cursor-pointer capitalize mx-2 font-semibold text-sm text-neutral-500 hover:text-neutral-900 py-1.5 px-4 rounded-lg transition-all ease duration-200 border border-neutral-300 shadow hover:border-neutral-900 flex items-center gap-2`}
            >
              <Pencil size={16} /> Edit profile
            </Link>
          </div>
          <p className="mt-5">Download free, beautiful high-quality photos curated by kaif.</p>
          <p className="mt-5 text-neutral-500 flex items-center gap-2"><XCircle size={16}/> Not available for hire <Link to="/settings#hiring" className="underline text-sm">Update</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
