import { useQuery } from "@tanstack/react-query";
import React from "react";
import ImageCard from "../components/common/ImageCard.jsx";
import fetchBookmarkIds from "../utils/getBookmarks.js";

const ProfileIllustrationsPage = () => {
  const photoType = "illustration";
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["dynamic-profile-content", photoType],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/content/${photoType}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        return data?.content;
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
    <div className="max-w-7xl mx-auto columns-3 gap-5.5 mt-15">
      {Array.isArray(data) &&
        data.map((value, index) => (
          <ImageCard
            key={index}
            value={value}
            isBookmarked={bookmarkedIds.has(value?._id)}
          />
        ))}
    </div>
  );
};

export default ProfileIllustrationsPage;
