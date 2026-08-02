import React from "react";
import ContributeCardButton from "../components/common/ContributeCardButton";
import { useSelector } from "react-redux";
import ImageCard from "../components/common/ImageCard.jsx";
import Image from "../assets/images/mock_1.jpg";
import ImageTwo from "../assets/images/mock_2.jpg";
import ImageThree from "../assets/images/mock_3.jpg";
import { useQuery } from "@tanstack/react-query";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton.jsx";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/photo/all`,
          {
            method: "GET",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.photos;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      {user && (
        <div className="mt-8">
          <ContributeCardButton />
        </div>
      )}
      <div className="mt-10 columns-3 gap-7">
        {isLoading && <ImageCardSkeleton />}
        {Array.isArray(data) &&
          data.map((value) => <ImageCard key={value._id} value={value} />)
        }
      </div>
    </div>
  );
};

export default Home;
