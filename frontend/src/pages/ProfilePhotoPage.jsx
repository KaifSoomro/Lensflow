import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProfileContent from "../utils/getProfileContent";
import ImageCard from "../components/common/ImageCard";
import { fetchBookmarkIds } from "../utils/getBookmarks";

const ProfilePhotoPage = () => {
  const photoType = "photo";
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

  console.log(data);
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

export default ProfilePhotoPage;
