import React from "react";
import { GoBookmarkSlash } from "react-icons/go";
import { IoBookmarkSharp } from "react-icons/io5";
import { Bookmark } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import ImageCard from "../components/common/ImageCard";

const Bookmarks = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useQuery({
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
      <div className="flex items-center">
        <div className="flex items-center gap-3.5">
          <IoBookmarkSharp className="text-2xl" />
          <h1 className="text-5xl font-bold">Bookmarks</h1>
        </div>
      </div>

      <h1 className="mt-18 mb-5">
        {data?.length === 1 ? "1 image" : `${data?.length} images`}
      </h1>
      <div
        className={`w-full ${data?.length === 0 && " h-100 flex items-center justify-center"} columns-3 gap-7`}
      >
        {data?.length === 0 ? (
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
        ) : (
          <div>
            {isLoading && <ImageCardSkeleton />}
            {Array.isArray(data) &&
              data.map((value) => (
                <ImageCard key={value._id} value={value} isBookmarked={true} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
