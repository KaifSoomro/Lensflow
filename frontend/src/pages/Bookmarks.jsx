import React from "react";
import SlashBookmark from "../assets/images/slash_bookmark.png";
import { Bookmark } from "lucide-react";

const Bookmarks = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-bold">Bookmarks</h1>
        </div>
      </div>

      <div className="w-full h-100 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <img src={SlashBookmark} alt="slash-bookmark" className="w-30 my-5" />
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
