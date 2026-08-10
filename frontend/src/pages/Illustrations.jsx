import React from "react";
import ImageCard from "../components/common/ImageCard";
import ContributeCardButton from "../components/common/ContributeCardButton";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import fetchBookmarkIds from "../utils/getBookmarks";

const Illustrations = () => {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["illustrationData"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/photo/all/illustrations`,
          {
            method: "GET",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.illustrations;
      } catch (error) {
        throw error;
      }
    },
  });

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarkIds"],
    queryFn: fetchBookmarkIds,
  });

  const bookmarkedIds = new Set(bookmarks || []);
  return (
    <div className="max-w-7xl mx-auto">
      {user && (
        <div className="mt-8">
          <ContributeCardButton type={"illustration"} />
        </div>
      )}
      <div className="mt-10 columns-1 md:columns-3 gap-5.5">
        {isLoading && (
          <>
            <ImageCardSkeleton />
            <ImageCardSkeleton />
            <ImageCardSkeleton />
          </>
        )}
        {Array.isArray(data) &&
          data.map((value, index) => (
            <ImageCard
              key={index}
              value={value}
              isBookmarked={bookmarkedIds.has(value?._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Illustrations;
