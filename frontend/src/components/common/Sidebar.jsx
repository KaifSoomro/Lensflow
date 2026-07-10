import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/logo_2.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Bookmark,
  Download,
  Folders,
  ImageIcon,
  LogIn,
  PenTool,
  User,
} from "lucide-react";
import ProfileImage from "../../assets/images/profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userSlice.js";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));

    toast.success("Logout successful.");
    // navigate("/login")
  };

  return (
    <div className="relative w-16 h-full border-r border-neutral-400/40 flex items-center flex-col pt-4">
      <Link to="/">
        <img src={Logo} alt="logo-img" className="w-9" />
      </Link>

      <div className="flex items-center flex-col border-b border-neutral-400/40 gap-3 mt-6 pb-6">
        <NavLink
          title="Photos"
          to="/"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"}`
          }
        >
          <ImageIcon />
        </NavLink>
        <NavLink
          title="Illustrations"
          to="/illustrations"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"}`
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
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"}`
          }
        >
          <Folders />
        </NavLink>
        <NavLink
          title="Download History"
          to="/download-history"
          className={({ isActive }) =>
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"}`
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
            `${isActive ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"}`
          }
        >
          <Bookmark />
        </NavLink>
      </div>

      <div
        ref={profileRef}
        className="flex items-center flex-col gap-2 pb-6 absolute bottom-0"
      >
        <NavLink
          title="Notifications"
          to="/notifications"
          className="text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all ease duration-200"
        >
          <Bell />
        </NavLink>

        <button
          title="Profile"
          onClick={() => setProfileOpen((prev) => !prev)}
          className={`${profileOpen ? "p-2 bg-neutral-200/80 rounded-lg text-black" : "text-neutral-500/80 hover:bg-neutral-400/15 rounded-lg p-2 transition-all duration-200"}`}
        >
          <img
            src={user?.profileImage || ProfileImage}
            alt="profile"
            className="w-8 rounded-full"
          />
        </button>

        {profileOpen && (
          <div className="absolute bottom-10 left-16 w-55 rounded-lg shadow/7 border border-neutral-300/80 bg-white p-2">
            {user && (
              <NavLink
                to="/profile"
                className="hover:bg-neutral-400/10 flex items-center justify-center flex-col rounded-lg p-2 transition-all ease duration-200"
              >
                <div className="p-1">
                  <img
                    src={user?.profileImage || ProfileImage}
                    alt="profile"
                    className="w-8 rounded-full"
                  />
                </div>

                <h1 className="font-semibold mt-1">{user?.fullName}</h1>
                <h3 className="text-xs text-neutral-600">View profile</h3>
              </NavLink>
            )}

            {user && (
              <div className="border-t border-neutral-400/40 mt-2 p-2 pt-3">
                <NavLink
                  to="/settings"
                  className="hover:bg-neutral-400/10 text-neutral-500 hover:text-black rounded-lg p-2 transition-all ease duration-200 text-sm pe-18.5"
                >
                  Account settings
                </NavLink>
              </div>
            )}

            {user && (
              <div className="border-t border-neutral-400/40 mt-2 p-2">
                <button
                  to="/profile"
                  onClick={handleLogout}
                  className="hover:bg-red-400/10 text-neutral-500 hover:text-black rounded-lg p-2 transition-all ease duration-200 text-sm pe-10 cursor-pointer"
                >
                  Logout @{user?.userName}
                </button>
              </div>
            )}

            {user ? (
              ""
            ) : (
              <NavLink
                to="/login"
                className="hover:bg-blue-400/10 text-neutral-500 hover:text-black rounded-lg p-2 transition-all ease duration-200 text-sm pe-18.5 flex items-center gap-3"
              >
                <LogIn size={20} /> Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
