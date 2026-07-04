import { LogIn } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="w-full h-29 border-b border-neutral-400/40 px-6">
      <div className="flex items-center gap-6 mt-3">
        <input
          type="text"
          placeholder="Search photos and illustrations"
          className="w-full rounded-full bg-neutral-200 h-10 ps-10 focus:bg-neutral-50 border border-neutral-50 focus:border-neutral-300 outline-none transition-all ease duration-200"
        />

        <Link to="/login" className="px-4 py-1 border-2 border-[#3B82F6] rounded-lg flex items-center gap-3 cursor-pointer text-neutral-700 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 transition-all ease duration-200">
          <LogIn /> Login
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
