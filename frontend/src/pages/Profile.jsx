import React from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfoSkeleton from "../components/profile/ProfileInfoSkeleton";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["profileData"],
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
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/photos/counts`,
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
