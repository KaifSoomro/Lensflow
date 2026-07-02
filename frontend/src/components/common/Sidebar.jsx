import React from "react";
import Logo from "../../assets/images/logo_2.png";
import { Link, NavLink } from "react-router-dom";
import { Bookmark, Download, Folders, House, PenTool } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 h-full border-r border-neutral-400/40 flex items-center flex-col pt-4">
      <Link to="/">
        <img src={Logo} alt="logo-img" className="w-9" />
      </Link>

      <div className="flex items-center flex-col border-b border-neutral-400/40 gap-3 mt-6 pb-6">
        <NavLink
          title="Home"
          to="/"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2"}`
          }
        >
          <House />
        </NavLink>
        <NavLink
          title="Illustrations"
          to="/illustrations"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2"}`
          }
        >
          <PenTool />
        </NavLink>
      </div>

      <div className="flex items-center flex-col border-b border-neutral-400/40 gap-3 mt-6 pb-6">
        <NavLink
          title="Collections"
          to="/collections"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2"}`
          }
        >
          <Folders />
        </NavLink>
        <NavLink
          title="Download History"
          to="/download-history"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2"}`
          }
        >
          <Download />
        </NavLink>
      </div>

      <div className="flex items-center flex-col gap-3 mt-6 pb-6">
        <NavLink
          title="Bookmarks"
          to="/bookmarks"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2"}`
          }
        >
          <Bookmark />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
