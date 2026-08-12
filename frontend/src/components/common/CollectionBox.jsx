import { Plus, Search, XIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDialog } from "../../features/collectionSlice";
import Image from "../../assets/images/illustration.jpg";
import { BsLockFill } from "react-icons/bs";
import { BsPlusCircleFill } from "react-icons/bs";

const CollectionBox = () => {
  const dispatch = useDispatch();
  const closeCollectionDialog = () => {
    dispatch(setShowDialog(false));
  };
  return (
    <div className="relative w-120 h-120 rounded-2xl bg-white flex flex-col items-center justify-start">
      <div className="w-full flex items-center justify-between border-b pb-4 border-neutral-400 px-7 pt-5">
        <Search size={25} className="text-neutral-500" />
        <input
          type="text"
          placeholder="Find a collection"
          className="w-full ps-6 border-none outline-none"
        />
        <button
          title="Close"
          onClick={closeCollectionDialog}
          className="cursor-pointer group"
        >
          <XIcon
            size={30}
            className="text-red-400 group-hover:text-red-600 transition-all ease"
          />
        </button>
      </div>
      <div className="w-full pt-3 px-7">
        <div className="flex items-center justify-start">
          <h1 className="text-md text-neutral-500 mt-3 px-3">A-Z</h1>
        </div>
        <button className="mt-5 w-full flex items-center justify-between hover:bg-neutral-100 p-3 rounded-md group cursor-pointer">
          <div className="flex items-center gap-5">
            <img src={Image} alt="collection-img-01" className="w-20 rounded" />
            <div>
              <h1 className="text-xl font-semibold">My first collection</h1>
              <span className="flex items-center gap-2 mt-1.5 text-neutral-500">
                {" "}
                <BsLockFill /> 1 image{" "}
              </span>
            </div>
          </div>
          <div className="hidden group-hover:block">
            <BsPlusCircleFill size={25} />
          </div>
        </button>
      </div>
      <div className="absolute bottom-0 w-full border-t border-neutral-400 p-3">
        <button className="w-full flex items-center gap-3 rounded-md hover:bg-neutral-100 transition-all ease-in px-3 py-2.5 cursor-pointer font-semibold">
          <Plus />
          Create a new collection
        </button>
      </div>
    </div>
  );
};

export default CollectionBox;
