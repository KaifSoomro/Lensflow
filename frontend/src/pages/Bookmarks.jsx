import React from "react";
import { GoBookmarkSlash } from "react-icons/go";
import { IoBookmarkSharp } from "react-icons/io5";
import { Bookmark, Download, Folders, Loader2, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import ImageCard from "../components/common/ImageCard";
import toast from "react-hot-toast";

const Bookmarks = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["getBookmarks"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/bookmark/get/bookmarks`,
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

  const { mutate: clearBookmarks, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/bookmark/delete/bookmarks`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["getBookmarks"],
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <IoBookmarkSharp className="text-2xl" />
          <h1 className="text-5xl font-bold">Bookmarks</h1>
        </div>
        {data?.length > 0 ? (
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-white transition-all ease duration-200 text-sm font-semibold bg-black hover:bg-linear-to-t hover:from-neutral-900 hover:to-neutral-800">
              <Download size={18} /> Download All
            </button>

            <button className="flex items-center gap-1 px-2 py-1 border-2 border-neutral-400/40 rounded-lg cursor-pointer text-neutral-500  transition-all ease duration-200 text-sm font-semibold hover:border-neutral-400/80 hover:text-neutral-600">
              <Folders size={18} /> Convert to collection
            </button>

            <button
              onClick={() => clearBookmarks()}
              className="flex items-center gap-1.5 px-2 py-1 border-2 border-red-400 rounded-lg cursor-pointer text-red-500  transition-all ease duration-200 text-sm font-semibold hover:bg-red-100 hover:text-red-700"
            >
              {isPending ? (
                <Loader2
                  size={18}
                  className="animate-spin duration-200 transition-all ease"
                />
              ) : (
                <>
                  {" "}
                  <Trash2 size={18} /> Clear{" "}
                </>
              )}
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
