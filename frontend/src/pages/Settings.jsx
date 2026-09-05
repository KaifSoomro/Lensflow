import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import SettingsTopBar from "../components/common/SettingsTopBar";
import Footer from "../components/common/Footer";

const Settings = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-140 h-full flex justify-end mt-35 px-25">
          <div>
            <h1 className="text-lg font-semibold">Account settings</h1>

            <div className="mt-7 flex flex-col gap-3.5">
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `${isActive ? "text-black" : "text-neutral-500 underline hover:text-neutral-800 transition-all ease"}`
                }
              >
                Edit profile
              </NavLink>

              <NavLink
                to="/account/password"
                className={({ isActive }) =>
                  `${isActive ? "text-black" : "text-neutral-500 underline hover:text-neutral-800 transition-all ease"}`
                }
              >
                Change password
              </NavLink>

              <NavLink
                to="/account/close"
                className={({ isActive }) =>
                  `${isActive ? "text-black" : "text-neutral-500 underline hover:text-neutral-800 transition-all ease"}`
                }
              >
                Close account
              </NavLink>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <SettingsTopBar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
};

export default Settings;
