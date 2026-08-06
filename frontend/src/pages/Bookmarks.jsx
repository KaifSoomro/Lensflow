import React from "react";
import { GoBookmarkSlash } from "react-icons/go";
import { IoBookmarkSharp } from "react-icons/io5";
import { Bookmark, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import ImageCard from "../components/common/ImageCard";

const Bookmarks = () => {
  const token = localStorage.getItem("token");
  const { data = [], isLoading } = useQuery({
    queryKey: ["getBookmarks"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/get/bookmarks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.bookmarks;
      } catch (error) {
        throw error;
      }
    },
  });

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <IoBookmarkSharp className="text-2xl" />
          <h1 className="text-5xl font-bold">Bookmarks</h1>
        </div>
        {data?.length > 0 ? (
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-2 py-1 border-2 border-black rounded-lg cursor-pointer text-red-400  transition-all ease duration-200 text-sm font-semibold hover:text-red-600">
              <Trash2 size={18} /> Clear
            </button>

            <button className="flex items-center gap-1.5 px-2 py-1 border-2 border-red-400/40 rounded-lg cursor-pointer text-red-400  transition-all ease duration-200 text-sm font-semibold hover:border-red-400 hover:text-red-600">
              <Trash2 size={18} /> Clear
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {data?.length > 0 ? (
        <h1 className="mt-18 mb-5">
          {data?.length === 1 ? "1 image" : `${data?.length} images`}
        </h1>
      ) : (
        ""
      )}
      <div
        className={`w-full ${data.length > 0 ? "columns-3 gap-7" : "h-100 flex items-center justify-center"}`}
      >
        {data?.length > 0 ? (
          <div>
            {isLoading && <ImageCardSkeleton />}
            {Array.isArray(data) &&
              data.map((value) => (
                <ImageCard key={value._id} value={value} isBookmarked={true} />
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <GoBookmarkSlash className="text-[130px] my-5 text-neutral-500" />
            <h1 className="font-semibold text-xl">
              Bookmark images to view later
            </h1>
            <span className="flex items-center gap-1 mt-3">
              Click{" "}
              <span className="bg-neutral-100 border border-neutral-500 rounded p-0.5">
                {" "}
                <Bookmark size={18} />{" "}
              </span>{" "}
              on any photo or illustration.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
