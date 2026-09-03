import React from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useQuery } from "@tanstack/react-query";
import ProfileInfoSkeleton from "../components/profile/ProfileInfoSkeleton";
import { Outlet, useParams } from "react-router-dom";

const Profile = () => {

  const { userId } = useParams();

  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data?.user;
      } catch (error) {
        throw error;
      }
    },
  });

  const { data: photos } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/photos/counts/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  console.log("Photos: ", photos)

  return (
    <div>
      {isLoading ? (
        <ProfileInfoSkeleton />
      ) : (
        <ProfileInfo data={data} photos={photos} />
      )}
      <Outlet />
    </div>
  );
};

export default Profile;
