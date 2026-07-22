import { Check, Plus, Bookmark, ArrowDown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import userImage from "../../assets/images/profile.webp";

const ImageCard = ({ value }) => {
  return (
    <Link
      to={`/photo/${value?._id}`}
      className="group relative mb-7 block w-full overflow-hidden rounded-lg cursor-zoom-in break-inside-avoid"
    >
      <img
        src={value?.image_url}
        alt={`image-${value?._id}`}
        className="block w-full h-auto object-cover transition-transform duration-200"
        draggable={false}
      />

      <div className="absolute inset-0 z-10 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute top-0 right-0 p-4 flex items-center justify-between gap-3">
          <button title="Bookmark" className="bg-neutral-300 rounded-md px-3 py-2 text-neutral-600 cursor-pointer hover:text-neutral-900 transition-all ease duration-200">
            <Bookmark size={21} />
          </button>

          <button title="Add to Collection" className="bg-neutral-300 rounded-md px-3 py-2 text-neutral-600 cursor-pointer hover:text-neutral-900 transition-all ease duration-200">
            <Plus size={21} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={value?.user?.profileImage || userImage}
              alt={value?.user?.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-white font-medium">
                {value?.user?.fullName}
              </h3>

              {value?.available && (
                <p className="text-gray-300 text-xs flex items-center gap-1">
                  Available for hire
                  <span className="w-3 h-3 rounded-full flex items-center justify-center bg-gray-300 text-gray-900">
                    <Check size={10} />
                  </span>
                </p>
              )}
            </div>
          </div>
          <button title="Download" className="bg-neutral-300 rounded-md px-3 py-2 text-neutral-600 cursor-pointer hover:text-neutral-900 transition-all ease duration-200">
            <ArrowDown size={21} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
