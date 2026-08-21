import React from "react";
import { BsLockFill, BsPlusCircleFill } from "react-icons/bs";
import CollectionCardSkeletions from "../common/CollectionCardSkeletions";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CollectionCard = ({ collection, isLoading }) => {
  const { photoId } = useSelector((state) => state.collection);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const isCollection = collection?.photos?.some(
    (photo) => photoId === photo?._id,
  );

  const { mutate: toggleCollection, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/toggle/${collection?._id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ photoId }),
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
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["collectionData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["collectionPhotoIds"],
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  return (
    <>
      {isLoading || isPending ? (
        <CollectionCardSkeletions />
      ) : (
        <button
          onClick={toggleCollection}
          className={`mt-5 w-full flex items-center justify-between px-3 py-2 rounded-md group cursor-pointer ${isCollection ? "hover:bg-blue-100" : "hover:bg-neutral-100"}`}
        >
          <div className="flex items-center gap-5">
            <div className="w-14 rounded overflow-hidden">
              {collection?.photos[0]?.cardImage ? (
                <img
                  src={collection?.photos[0]?.cardImage}
                  alt="collection-img-01"
                />
              ) : <div className="w-14 h-15 bg-neutral-200"></div>}
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                {collection?.collectionName}
              </h1>
              <span className="flex items-center gap-2 mt-1.5 text-neutral-500">
                {collection?.private ? <BsLockFill /> : ""}
                {collection?.photos.length === 1
                  ? `${collection?.photos.length} image`
                  : `${collection?.photos.length} images`}
              </span>
            </div>
          </div>
          <div className="hidden group-hover:block">
            {isCollection ? (
              <BiSolidMinusCircle
                size={25}
                className={`${isCollection && "text-blue-600"}`}
              />
            ) : (
              <BsPlusCircleFill size={25} />
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default CollectionCard;
