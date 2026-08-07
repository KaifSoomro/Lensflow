import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProfileContent from "../utils/getProfileContent.js";

const ProfileIllustrationsPage = () => {
  const photoType = "illustration";
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["dynamic-profile-content", photoType],
    queryFn: () => getProfileContent(photoType, token),
  });

  console.log(data && data);
  return <div>ProfileIllustrationsPage: {photoType}</div>;
};

export default ProfileIllustrationsPage;
