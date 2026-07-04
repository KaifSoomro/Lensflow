import React from "react";
import Logo from "../assets/images/logo_2.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-5">
      <div className="flex items-center justify-center flex-col">
        <img src={Logo} alt="logo-image" className="w-16" />
        <h1 className="text-3xl font-semibold mt-4 text-[#111827]">
          Create your account
        </h1>
        <p className="text-xl mt-4">
          Sign up to continue with LensFlow.
        </p>
        <form className="mt-8">
          <div className="flex justify-center flex-col">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="fullName"
              name="fullName"
              className="w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none ps-2"
            />
          </div>
          <div className="flex justify-center flex-col mt-5">
            <label htmlFor="userName">Username</label>
            <input
              type="userName"
              name="userName"
              className="w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none ps-2"
            />
          </div>
          <div className="flex justify-center flex-col mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none ps-2"
            />
          </div>
          <div className="flex justify-center flex-col mt-5">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              className="w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none ps-2"
            />
          </div>
          <button
            type="submit"
            className="w-80 md:w-90 h-9 bg-[#3B82F6] text-white font-semibold cursor-pointer hover:bg-[#3B82F6]/90 transition-all ease duration-200 rounded-sm outline-none ps-2 mt-6"
          >
            Create Account
          </button>
        </form>
        <p className="mt-5 text-neutral-800">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2260c5] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
