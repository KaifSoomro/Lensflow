import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/change-password`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    changePassword(formData)
  };
  return (
    <div className="max-w-7xl mx-auto px-20 mt-29">
      <h1 className="text-lg font-semibold">Change password</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-8">
          <div className="flex justify-center gap-5">
            <div className="w-full">
              <label>Current password</label>

              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-center gap-5">
            <div className="w-full">
              <label>Password</label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-center gap-5">
            <div className="w-full">
              <label>Password confirmation</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
        </div>

        { errorMsg && <p className="text-lg text-red-600 mt-5">{errorMsg}</p> }

        <button
          type="submit"
          className="mt-6 w-full px-2 py-3 rounded-lg cursor-pointer text-white transition-all ease duration-200 bg-linear-to-t from-neutral-900 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700"
        >
          { isPending ? "Loading..." : "Change password" }
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
