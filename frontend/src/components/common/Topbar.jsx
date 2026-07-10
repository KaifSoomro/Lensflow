import { LogIn } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { setParagraph } from "../../features/dynamicRouteSlice";

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const routesLink = [
    {
      name: "featured",
      link: "/",
    },
    {
      name: "nostalgia",
      link: "/t/nostalgia",
      paragraph:
        "Capture the feeling of looking back through photography or 3D art for a chance to win $100 USD and be featured. T&Cs apply.",
    },
    {
      name: "summer",
      link: "/t/summer",
      paragraph:
        "Experience the warmth of summer through sun-soaked days, coastal escapes, and golden evenings.",
    },
    {
      name: "wallpapers",
      link: "/t/wallpapers",
      paragraph:
        "From epic drone shots to inspiring moments in nature — enjoy the best background for your desktop or mobile.",
    },
    {
      name: "3d renders",
      link: "/t/3d-renders",
      paragraph:
        "This category showcases digitally rendered creations that blend technology and art, exploring the limitless potential of digital creativity.",
    },
    {
      name: "nature",
      link: "/t/nature",
      paragraph:
        "This category showcases nature’s beauty, from vast landscapes to macro details, transporting viewers to the outdoors.",
    },
    {
      name: "texture",
      link: "/t/texture",
      paragraph:
        "Whether you’re looking for stunning macro-photography or shots of complex architectural shapes — you’ve come to the right place.",
    },
    {
      name: "film",
      link: "/t/film",
      paragraph:
        "This category celebrates film's timeless beauty, capturing moments with rich textures and unique colors that define analog photography.",
    },
    {
      name: "street photography",
      link: "/t/street-photography",
      paragraph:
        "From quiet passages in charming towns to the hustle and bustle of cities, this category examines street photography in every form.",
    },
  ];

  const handleDynamicRoute = (val) => {
    navigate(val.link);
    dispatch(setParagraph(val.paragraph));
  };
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
          <button
            onClick={() => handleDynamicRoute(val)}
            className={`cursor-pointer capitalize mx-2 font-semibold text-sm ${location.pathname === val.link ? "py-4 px-2 border-b-2 border-neutral-900" : "text-neutral-500 hover:text-neutral-900  py-4 px-2 transition-all ease duration-200"}`}
          >
            {val.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
