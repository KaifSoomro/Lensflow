import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container.jsx";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/common/ImageCard.jsx";
import LaptopImage from "../assets/images/laptop.png";
import fetchBookmarkIds from "../utils/getBookmarks.js";
import ImageCardSkeleton from "../components/common/ImageCardSkeleton.jsx";

const CategoryPage = () => {
  const { paragraph } = useSelector((state) => state.dynamicRoute);
  const { category } = useParams();
  const newCategoryName = category.split("-").join(" ");

  console.log("category: ", category);

  const { data, isLoading } = useQuery({
    queryKey: ["category-photos", category],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/photo/find/${category}`,
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

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarkIds"],
    queryFn: fetchBookmarkIds,
  });

  const bookmarkedIds = new Set(bookmarks || []);

  console.log("categoryData: ", data);
  return (
    <div className="max-w-7xl mx-auto mt-25">
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <h1 className="capitalize font-bold text-4xl">{newCategoryName}</h1>
          <p className="mt-2 text-neutral-600">Curated by Lensflow</p>
          <p className="mt-3">{paragraph}</p>

          <button className="w-auto mt-8 py-3 rounded-lg cursor-pointer text-white bg-neutral-900 hover:bg-neutral-900/90 transition-all ease duration-200 font-semibold">
            {" "}
            Submit to{" "}
            <span className="capitalize font-bold">{newCategoryName}</span>
          </button>
        </div>
      </div>
      {data?.length > 0 ? (
        <div className="columns-3 gap-5.5 mt-20">
          {Array.isArray(data) &&
            data.map((value, index) => (
              <ImageCard
                key={index}
                value={value}
                isBookmarked={bookmarkedIds.has(value?._id)}
              />
            ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mt-20 gap-5.5">
          {isLoading ? (
            <>
            <ImageCardSkeleton />
            <ImageCardSkeleton />
            <ImageCardSkeleton />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src={LaptopImage} alt="laptop-img" className="w-75" />
              <h1 className="capitalize text-lg">
                {" "}
                <span className="font-semibold">{newCategoryName}</span> not
                found.{" "}
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
