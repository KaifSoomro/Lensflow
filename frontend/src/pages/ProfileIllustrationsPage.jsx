import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProfileContent from "../utils/getProfileContent.js";
import ImageCard from "../components/common/ImageCard.jsx";
import { fetchBookmarkIds } from "../utils/getBookmarks.js";

const ProfileIllustrationsPage = () => {
  const photoType = "illustration";
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["dynamic-profile-content", photoType],
    queryFn: () => getProfileContent(photoType, token),
  });

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarkIds"],
    queryFn: fetchBookmarkIds,
  });

  const bookmarkedIds = new Set(bookmarks || []);

  return (
    <div className="max-w-7xl mx-auto columns-3 gap-5.5 mt-15">
      {Array.isArray(data) &&
        data.map((value) => (
          <ImageCard
            key={value?._id}
            value={value}
            isBookmarked={bookmarkedIds.has(value?._id)}
          />
        ))}
    </div>
  );
};

export default ProfileIllustrationsPage;
