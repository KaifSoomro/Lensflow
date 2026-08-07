import React from "react";
import Image from "../../assets/images/profile.webp";
import { Link, useLocation } from "react-router-dom";
import { Folders, ImageIcon, Pencil, PenTool, XCircle } from "lucide-react";

const ProfileInfo = ({ data }) => {
  const firstName = data?.fullName.split(" ")[0];
  const location = useLocation();
  return (
    <>
      <div className="w-full h-60 pt-10 flex items-start justify-center">
        <div className="flex items-start justify-center gap-15">
          <div>
            <img
              src={data?.profileImage || Image}
              alt="profile-img"
              className="w-40 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-4xl text-neutral-900">
                {data?.fullName}
              </h1>
              <Link
                to="/settings"
                className={`cursor-pointer capitalize mx-2 font-semibold text-sm text-neutral-500 hover:text-neutral-900 py-1.5 px-4 rounded-lg transition-all ease duration-200 border border-neutral-300 shadow hover:border-neutral-900 flex items-center gap-2`}
              >
                <Pencil size={16} /> Edit profile
              </Link>
            </div>
            <p className="mt-5">
              Download free, beautiful high-quality photos curated by{" "}
              {firstName}
            </p>
            <p className="mt-5 text-neutral-500 flex items-center gap-2">
              <XCircle size={16} /> Not available for hire{" "}
              <Link to="/settings#hiring" className="underline text-sm">
                Update
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-1 border-b border-neutral-300">
        <Link
          to={`/profile/${data?._id}`}
          className={`flex items-center gap-2 cursor-pointer capitalize mx-2 font-semibold text-sm ${location.pathname === `${`/profile/${data?._id}`}` ? "py-4 px-2 border-b-2 border-neutral-900" : "text-neutral-500 hover:text-neutral-900  py-4 px-2 transition-all ease duration-200"}`}
        >
          <ImageIcon size={18}/> Photos
        </Link>

        <Link
          to={`/profile/${data?._id}/illustrations`}
          className={`flex items-center gap-2 cursor-pointer capitalize mx-2 font-semibold text-sm ${location.pathname === `${`/profile/${data?._id}/illustrations`}` ? "py-4 px-2 border-b-2 border-neutral-900" : "text-neutral-500 hover:text-neutral-900  py-4 px-2 transition-all ease duration-200"}`}
        >
          <PenTool size={18}/> Illustrations
        </Link>

        <Link
          to={`/profile/${data?._id}/collections`}
          className={`flex items-center gap-2 cursor-pointer capitalize mx-2 font-semibold text-sm ${location.pathname === `${`/profile/${data?._id}/collections`}` ? "py-4 px-2 border-b-2 border-neutral-900" : "text-neutral-500 hover:text-neutral-900  py-4 px-2 transition-all ease duration-200"}`}
        >
          <Folders size={18}/> Collections
        </Link>
      </div>
    </>
  );
};

export default ProfileInfo;
