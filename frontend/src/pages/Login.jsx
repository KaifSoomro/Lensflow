import React, { useState } from "react";
import Logo from "../assets/images/logo_2.png";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        console.log(data);

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login successful.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center px-5">
      <div className="flex items-center justify-center flex-col">
        <img src={Logo} alt="logo-image" className="w-16" />
        <h1 className="text-3xl font-semibold mt-4 text-[#111827]">Login</h1>
        <p className="text-xl mt-4">Welcome back! Log in to LensFlow</p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex justify-center flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              className="w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none ps-2"
            />
          </div>
          <div className="flex justify-center flex-col mt-5">
            <label htmlFor="email">Password</label>
            <div className="flex items-center w-80 md:w-90 h-9 border border-neutral-500 rounded-sm outline-none px-2">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleFormData}
                className="w-80 md:w-90 h-9 rounded-sm outline-none"
              />
              <button onClick={handleShowPass} className="cursor-pointer">
                {showPass ? <EyeOff /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-80 md:w-90 h-9 bg-[#3B82F6] text-white font-semibold cursor-pointer hover:bg-[#3B82F6]/90 transition-all ease duration-200 rounded-sm outline-none ps-2 mt-6"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-neutral-800">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#2260c5] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
