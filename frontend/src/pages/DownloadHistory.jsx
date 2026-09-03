import { useQuery } from "@tanstack/react-query";
import DownloadHistoryCard from "../components/common/DownloadHistoryCard";
import useFormatDate from "../utils/useFormatDate.js";
import DownloadHistoryCardSkeleton from "../components/common/DownloadHistoryCardSkeleton.jsx";
import LaptopImage from "../assets/images/laptop.png";

const DownloadHistory = () => {
  const token = localStorage.getItem("token");

  const formatDate = useFormatDate();

  const { data, isLoading } = useQuery({
    queryKey: ["download-history"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/download/history`,
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

        return data?.downloadHistory[0];
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-155 mt-10">
        <h1 className="text-5xl font-bold">Download History</h1>
        <p className="mt-5 text-lg">
          Your download history includes everything that you have downloaded
          while being logged in. It is only visible to you.
        </p>
      </div>

      {isLoading ? (
        <div className="h-6 w-55 bg-neutral-200 animate-pulse rounded mt-15 mb-5" />
      ) : (
        <h1 className="mt-15 font-semibold text-lg mb-5">
          {data?.createdAt && "Created at " + formatDate(data?.createdAt)}
        </h1>
      )}
      <div
        className={`w-full mb-30 ${data?.downloadedPhotos.length > 0 ? "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-15 gap-y-18" : "flex items-center justify-center"}`}
      >
        {data?.downloadedPhotos.length > 0 ? (
          Array.isArray(data?.downloadedPhotos) &&
          data?.downloadedPhotos.map((value, index) => (
            <DownloadHistoryCard key={index} value={value} user={data?.user} />
          ))
        ) : (
          <>
            {isLoading ? (
              <DownloadHistoryCardSkeleton />
            ) : (
              <div className="w-full flex items-center justify-center flex-col">
                <img src={LaptopImage} alt="laptop_img" className="w-90"/>
                <h1>No download history found.</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadHistory;
