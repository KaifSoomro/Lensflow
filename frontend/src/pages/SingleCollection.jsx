import React, { useEffect, useState } from "react";
import { BsLockFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileImage from "../assets/images/profile.webp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton";
import fetchCollectionPhotoIds from "../utils/getCollectionPhotoIds";
import fetchBookmarkIds from "../utils/getBookmarks";
import ImageCard from "../components/common/ImageCard";
import LaptopImage from "../assets/images/laptop.png";
import { Download, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setEditShowDialog } from "../features/collectionSlice.js";
import toast from "react-hot-toast";

const SingleCollection = () => {
  const { collectionId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { showEditDialog } = useSelector((state) => state.collection);
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { data: collection, isLoading } = useQuery({
    queryKey: ["singleCollection"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/${collectionId}`,
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

  const [name, setName] = useState("");
  const [private_value, setPrivateValue] = useState(null);

  useEffect(() => {
    if (collection?.collectionName) {
      setName(collection?.collectionName);
      setPrivateValue(collection?.private);
    }
  }, [collection]);

  const collectionData = {
    collectionName: name,
    isPrivate: private_value,
    collectionId: collectionId,
  };

  const length = Number(name.length || 0);
  const max = 60 - length;

  const handleNameInput = (e) => {
    if (length <= 60) {
      setName(e.target.value);
    }
  };

  const { mutate: updateCollection, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/update/${collectionId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionData),
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
        queryKey: ["singleCollection"],
      });
      dispatch(setEditShowDialog(false));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteCollection, isPending: delPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/delete/${collectionId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
      toast.error(data.message);
      navigate(`/profile/${user._id}/collections`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateCollection = (e) => {
    e.preventDefault();
    updateCollection();
  };

  const handleDeleteCollection = (e) => {
    e.preventDefault();
    deleteCollection();
  };

  return (
    <>
      {showEditDialog && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-30 flex items-center justify-center">
          <div className="relative w-130 rounded-xl bg-white shadow-lg p-8">
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
                <div className="border border-neutral-400 rounded-lg py-2 px-2 transition-all ease hover:border-neutral-700 text-sm flex items-center justify-between">
                  <input
                    type="text"
                    className="w-full pe-2 outline-none"
                    placeholder="Beautiful photos"
                    value={name}
                    onChange={handleNameInput}
                  />
                  <p className="text-neutral-700">{max}</p>
                </div>
              </div>

              <div className="flex mt-10 gap-1.5">
                <input
                  type="checkbox"
                  checked={private_value}
                  onChange={(e) => setPrivateValue(e.target.checked)}
                />
                <h2 className="flex items-center gap-1.5">
                  Make collection private{" "}
                  <BsLockFill size={12} className="text-neutral-600" />
                </h2>
              </div>

              {showDeletePanel ? (
                <div className="flex items-center justify-between mt-10">
                  <div className="flex items-center gap-1.5">
                    <h1>Are you sure?</h1>
                    <button
                      onClick={() => setShowDeletePanel(false)}
                      className="underline text-neutral-500 cursor-pointer hover:text-neutral-600 transition-all ease duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    onClick={handleDeleteCollection}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg cursor-pointer text-white transition-all ease duration-200 text-md font-semibold bg-linear-to-t from-red-600 to-red-500 hover:bg-linear-to-t hover:from-red-700 hover:to-red-500"
                  >
                    {delPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={() => setShowDeletePanel(true)}
                    className="underline text-red-400 cursor-pointer hover:text-red-600 transition-all ease duration-200"
                  >
                    Delete collection
                  </button>
                  <button
                    onClick={handleUpdateCollection}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg cursor-pointer text-white transition-all ease duration-200 text-md font-semibold bg-black hover:bg-linear-to-t hover:from-neutral-900 hover:to-neutral-800"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="w-full flex items-center justify-between">
          <div>
            {isLoading || isPending ? (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-neutral-200 animate-pulse" />
                <div className="h-12 w-80 rounded-lg bg-neutral-200 animate-pulse" />
              </div>
            ) : (
              <h1 className="capitalize font-bold text-5xl mt-4 flex items-center gap-2">
                {collection?.private && <BsLockFill size={20} />}
                {collection?.collectionName}
              </h1>
            )}
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
                className={`w-full ${isLoading || isPending ? "grid grid-cols-3 gap-7 relative mt-50 mb-10" : "flex items-center justify-center"}`}
              >
                {isLoading || isPending ? (
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
