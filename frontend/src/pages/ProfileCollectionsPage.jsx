import React from "react";
import ProfileCollectionCard from "../components/profile/ProfileCollectionCard";
import { useQuery } from "@tanstack/react-query";

const ProfileCollectionsPage = () => {
  const token = localStorage.getItem("token");
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collectionData"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/collection/getAll`,
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

  console.log(collections)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full grid grid-cols-3 mt-15">
        {Array.isArray(collections) &&
          collections.map((collection, index) => (
            <ProfileCollectionCard collection={collection} />
          ))}
      </div>
    </div>
  );
};

export default ProfileCollectionsPage;
