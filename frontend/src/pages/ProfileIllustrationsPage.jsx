import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/common/ImageCard.jsx";
import fetchBookmarkIds from "../utils/getBookmarks.js";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton.jsx";
import { useParams } from "react-router-dom";
import LaptopImage from "../assets/images/laptop.png";

const ProfileIllustrationsPage = () => {
  const photoType = "illustration";
  const token = localStorage.getItem("token");
  const { userId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["dynamic-profile-content", userId],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/content/${photoType}/${userId}`,
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

  const photos = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-7xl mx-auto mt-15">
      {isLoading ? (
        <div className="columns-3 gap-5.5">
          {[1, 2, 3].map((index) => (
            <ImageCardSkeleton key={index} />
          ))}
        </div>
      ) : photos.length > 0 ? (
        <div className="columns-3 gap-5.5">
          {photos.map((value) => (
            <ImageCard
              key={value._id}
              value={value}
              isBookmarked={bookmarkedIds.has(value._id)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[30vh] flex items-center justify-center">
          <img src={LaptopImage} alt="laptop-img" className="w-80" />
        </div>
      )}
    </div>
  );
};

export default ProfileIllustrationsPage;
