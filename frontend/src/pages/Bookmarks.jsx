import React from "react";
import { GoBookmarkSlash } from "react-icons/go";
import { IoBookmarkSharp } from "react-icons/io5";
import { Bookmark } from "lucide-react";

const Bookmarks = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="flex items-center">
        <div className="flex items-center gap-3.5">
          <IoBookmarkSharp className="text-2xl"/>
          <h1 className="text-5xl font-bold">Bookmarks</h1>
        </div>
      </div>

      <div className="w-full h-100 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <GoBookmarkSlash className="text-[130px] my-5 text-neutral-500"/>
          <h1 className="font-semibold text-xl">
            Bookmark images to view later
          </h1>
          <span className="flex items-center gap-1 mt-3">Click <span className="bg-neutral-100 border border-neutral-500 rounded p-0.5"> <Bookmark size={18} /> </span> on any photo or illustration.</span>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
