import React from "react";
import ProfileCollectionCard from "../components/profile/ProfileCollectionCard";
import { useQuery } from "@tanstack/react-query";
import CollectionCardSkeleton from "../components/collection/CollectionCardSkeleton";
import LaptopImage from "../assets/images/laptop.png";

const ProfileCollectionsPage = () => {
  const token = localStorage.getItem("token");
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collectionData"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/getAll`,
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

        return data?.collections;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full grid grid-cols-3 mt-15">
        {isLoading ? (
          <>
            <CollectionCardSkeleton />
            <CollectionCardSkeleton />
            <CollectionCardSkeleton />
          </>
        ) : Array.isArray(collections) ? (
          collections?.map((collection, index) => (
            <ProfileCollectionCard collection={collection} />
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <div>
              <img src={LaptopImage} alt="laptop-img" className="w-80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCollectionsPage;
