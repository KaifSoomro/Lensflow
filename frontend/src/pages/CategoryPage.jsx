import React from "react";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container.jsx";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const { paragraph } = useSelector((state) => state.dynamicRoute);
  const { category } = useParams();
  const newCategoryName = category.split("-").join(" ");
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 mt-25">
      <div className="flex flex-col">
        <h1 className="capitalize font-bold text-4xl">{newCategoryName}</h1>
        <p className="mt-2 text-neutral-600">Curated by Lensflow</p>
        <p className="mt-3">{paragraph}</p>

        <button className="w-auto mt-8 py-3 rounded-lg cursor-pointer text-white bg-neutral-900 hover:bg-neutral-900/90 transition-all ease duration-200 font-semibold">
          {" "}
          Submit to <span className="capitalize font-bold">{newCategoryName}</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
