import { useQuery } from "@tanstack/react-query";
import {
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  Download,
  Plus,
} from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../assets/images/profile.webp";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SinglePhoto = () => {
  const { photoId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["singlePhoto"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/photo/single/${photoId}`,
          {
            method: "GET",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.photo;
      } catch (error) {
        throw error;
      }
    },
  });

  console.log(data);
  return (
    <div className="w-full px-10">
      <div className="w-full h-15 bg-white flex items-center justify-between">
        <Link
          to={`/profile/${data?.user?._id}`}
          className="flex items-center gap-3"
        >
          <img
            src={data?.user?.profileImage || Image}
            alt="profile-photo"
            className="w-10 rounded-full"
          />
          <div>
            <h2 className="capitalize font-semibold">{data?.user?.fullName}</h2>
            {data?.user?.available && (
              <p className="text-blue-500 text-xs flex items-center gap-1">
                Available for hire
                <span className="w-3 h-3 rounded-full flex items-center justify-center bg-blue-500 text-white">
                  <Check size={10} />
                </span>
              </p>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <button
            title="Bookmarks"
            className="text-neutral-500/80 hover:text-neutral-800 border hover:border-neutral-800 rounded-lg p-2 transition-all ease duration-200 cursor-pointer shadow"
          >
            <Bookmark size={23} />
          </button>

          <button
            title="Add to Collection"
            className="text-neutral-500/80 hover:text-neutral-800 border hover:border-neutral-800 rounded-lg p-2 transition-all ease duration-200 cursor-pointer shadow"
          >
            <Plus size={23} />
          </button>

          <div className="flex items-center gap-0.5">
            <button className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer px-3 py-2 rounded-l-lg font-semibold shadow">
              Download free
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 px-4 py-2.5 text-sm font-medium transition">
                <ChevronDown size={20} />
              </button>

              <div className="absolute right-0 top-12 z-50 w-64 origin-top-right overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl opacity-0 scale-95 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:scale-100">
                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Small
                    </p>
                    <span className="text-xs text-neutral-500">640 × 426</span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Medium
                    </p>
                    <span className="text-xs text-neutral-500">1080 × 720</span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Large
                    </p>
                    <span className="text-xs text-neutral-500">
                      1920 × 1280
                    </span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between border-t border-neutral-300 px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-neutral-900">
                      Original Size
                    </p>
                    <span className="text-xs text-neutral-500">
                      6000 × 4000
                    </span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 flex-col">
        <Zoom>
          <img
            src={data?.previewImage}
            alt="preview-image"
            className="w-200 cursor-zoom-in"
          />
        </Zoom>
      </div>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-25">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-neutral-500">Views</h1>
            <p>{data?.views}</p>
          </div>

          <div className="flex items-center justify-center flex-col">
            <h1 className="text-neutral-500">Downloads</h1>
            <p>{data?.downloads}</p>
          </div>
        </div>

        <h1 className="text-neutral-500 flex items-center gap-2">
          <Calendar size={18} /> Published on 20/10/2026
        </h1>
      </div>

      <div className="mt-10 flex items-center gap-4">
        {data?.tags?.map((text, index) => (
          <div
            key={index}
            className="bg-neutral-200 text-neutral-600 text-sm rounded-lg py-1 px-2 capitalize"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePhoto;
