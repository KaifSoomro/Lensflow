import React from "react";
import { BsLockFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ProfileImage from "../assets/images/profile.webp";
import { useQuery } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import fetchCollectionPhotoIds from "../utils/getCollectionPhotoIds";
import fetchBookmarkIds from "../utils/getBookmarks";
import ImageCard from "../components/common/ImageCard";
import LaptopImage from "../assets/images/laptop.png";
import { Download, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setEditShowDialog } from "../features/collectionSlice.js";

const SingleCollection = () => {
  const { collectionId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { showEditDialog } = useSelector((state) => state.collection);

  const { data: collection, isLoading } = useQuery({
    queryKey: ["singleCollection"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/collection/${collectionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.collection;
      } catch (error) {
        throw error;
      }
    },
  });

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarkIds"],
    queryFn: fetchBookmarkIds,
  });

  const { data: collections } = useQuery({
    queryKey: ["collectionPhotoIds"],
    queryFn: fetchCollectionPhotoIds,
  });

  const bookmarkedIds = new Set(bookmarks || []);
  const collectionPhotoIds = new Set(collections || []);

  return (
    <>
      {showEditDialog && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-30 flex items-center justify-center">
          <div className="relative w-130 h-120 rounded-xl bg-white shadow-lg p-8">
            <button
              className="absolute top-8 right-8 cursor-pointer text-neutral-600 hover:text-neutral-800 transition-all ease"
              onClick={() => dispatch(setEditShowDialog(false))}
            >
              <XIcon size={30} />
            </button>
            <div>
              <h1 className="font-bold text-3xl">Edit collection</h1>
            </div>

            <form>
              <div className="flex flex-col gap-2 mt-10">
                <label htmlFor="name">Name</label>
                <input type="text" className="border rounded-lg py-1 ps-2 outline-neutral-700 transition-all ease"/>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="capitalize font-bold text-5xl mt-4 flex items-center gap-2">
              {collection?.private && <BsLockFill size={20} />}
              {collection?.collectionName}
            </h1>
            <Link to={`/profile/${collection?.user?._id}`}>
              <div className="flex items-center gap-2 mt-5">
                <img
                  src={collection?.user?.profileImage || ProfileImage}
                  alt="profile-image"
                  className="w-8 rounded-full"
                />
                <h1 className="font-semibold">{collection?.user?.fullName}</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(setEditShowDialog(true))}
              className="flex items-center gap-1 px-2 py-1.5 border shadow-sm border-neutral-400/40 rounded-lg cursor-pointer text-neutral-500  transition-all ease duration-200 text-sm font-semibold hover:border-neutral-400/80 hover:text-neutral-600"
            >
              Edit
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-white transition-all ease duration-200 text-sm font-semibold bg-black hover:bg-linear-to-t hover:from-neutral-900 hover:to-neutral-800">
              <Download size={18} /> Download All
            </button>
          </div>
        </div>
        <div>
          {collection?.photos?.length > 0 ? (
            <h1 className="mt-20 mb-5 text-neutral-600">
              {collection?.photos?.length === 1
                ? "1 image"
                : `${collection?.photos?.length} images`}
            </h1>
          ) : (
            ""
          )}

          <div
            className={`w-full ${collection?.photos?.length > 0 ? "columns-3 gap-7" : "h-100 flex items-center justify-center"} mb-18`}
          >
            {collection?.photos?.length > 0 ? (
              <div>
                {isLoading && <ImageCardSkeleton />}
                {Array.isArray(collection?.photos) &&
                  collection?.photos.map((value, index) => (
                    <ImageCard
                      key={index}
                      value={value}
                      isBookmarked={bookmarkedIds.has(value?._id)}
                      isCollection={collectionPhotoIds.has(value?._id)}
                    />
                  ))}
              </div>
            ) : (
              <div
                className={`w-full ${isLoading ? "grid grid-cols-3 gap-7 relative mt-50 mb-10" : "flex items-center justify-center"}`}
              >
                {isLoading ? (
                  <>
                    <ImageCardSkeleton />
                    <ImageCardSkeleton />
                    <ImageCardSkeleton />
                  </>
                ) : (
                  <div>
                    <img src={LaptopImage} alt="laptop-img" className="w-80" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCollection;
