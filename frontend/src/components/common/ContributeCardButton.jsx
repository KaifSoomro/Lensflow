import { Plus } from "lucide-react";
import React from "react";
import Image from "../../assets/images/contribute_card_image_1.jpg";
import ImageTwo from "../../assets/images/contribute_card_image_2.jpg";

const ContributeCardButton = () => {
  return (
    <div className="w-80 h-75 border border-neutral-300 rounded-xl p-6">
      <h1 className="font-semibold text-neutral-500">
        Contribute your first{" "}
        <span className="font-bold text-neutral-700">photo</span>
      </h1>
      <button className="w-full h-[85%] mt-5 border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-neutral-400 transition-all duration-200 ease-in-out group overflow-hidden relative">
        <img
          src={ImageTwo}
          alt="image_nature_two"
          className="w-40 -rotate-15 absolute bottom-0 -left-28 group-hover:-rotate-18 group-hover:-translate-x-1 transition-all duration-200 ease-in-out rounded"
        />
        <img
          src={Image}
          alt="image_nature"
          className="w-40 rotate-15 absolute top-0 -right-28 group-hover:rotate-18 group-hover:translate-x-1 transition-all duration-200 ease-in-out rounded"
        />
        <div className="w-9 h-9 rounded-full bg-[#3B82F6] text-white flex items-center justify-center group-hover:bg-[#3378e7] transition-all duration-200 ease-in-out">
          <Plus />
        </div>
      </button>
    </div>
  );
};

export default ContributeCardButton;
