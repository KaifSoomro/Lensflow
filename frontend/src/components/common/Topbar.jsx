import { LogIn } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Topbar = () => {
  const { user } = useSelector((state) => state.user);

  const routesLink = [
    {
      name: "featured",
      link: "/",
    },
    {
      name: "nostalgia",
      link: "/t/nostalgia",
    },
    {
      name: "summer",
      link: "/t/summer",
    },
    {
      name: "wallpapers",
      link: "/t/wallpapers",
    },
    {
      name: "3d renders",
      link: "/t/3d-renders",
    },
    {
      name: "nature",
      link: "/t/nature",
    },
    {
      name: "texture",
      link: "/t/texture",
    },
    {
      name: "film",
      link: "/t/film",
    },
    {
      name: "street photography",
      link: "/t/street-photography",
    },
  ];
  return (
    <div className="w-full h-29 border-b border-neutral-400/40 px-6">
      <div className="flex items-center gap-6 mt-3">
        <input
          type="text"
          placeholder="Search photos and illustrations"
          className="w-full rounded-full bg-neutral-200 h-10 ps-10 focus:bg-neutral-50 border border-neutral-50 focus:border-neutral-300 outline-none transition-all ease duration-200"
        />

        {user ? (
          <button className="w-40 px-4 py-1 border-2 border-neutral-400/40 rounded-lg cursor-pointer text-neutral-500  transition-all ease duration-200 text-sm font-semibold hover:border-neutral-400/80 hover:text-neutral-600">
            Submit an Image
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 border-2 border-[#3B82F6] rounded-lg flex items-center gap-3 cursor-pointer text-neutral-700 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 transition-all ease duration-200"
          >
            <LogIn /> Login
          </Link>
        )}
      </div>

      {/* Sub navigation */}
      <div className="w-full flex items-center mt-2.5">
        {routesLink.map((val, index) => (
          <NavLink
            to={val.link}
            className={({ isActive }) =>
              `capitalize mx-2 font-semibold text-sm ${isActive ? "py-4 px-2 border-b-2 border-neutral-900" : "text-neutral-500 hover:text-neutral-900  py-4 px-2 transition-all ease duration-200"}`
            }
          >
            { val.name }
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
