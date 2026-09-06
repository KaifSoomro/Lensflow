import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { setUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

const CloseAccount = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const token = localStorage.getItem("token");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/delete-account`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({currentPassword}),
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
      localStorage.removeItem("token");
      dispatch(setUser(null));
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteAccount();
    setCurrentPassword("");
  };
  return (
    <div className="max-w-7xl mx-auto px-20 mt-29">
      <h1 className="text-lg font-semibold">Close account</h1>
      <form onSubmit={handleSubmit}>
        <p className="mt-10">
          <b className="text-orange-500">Warning: </b>closing your account is
          irreversible. It deletes all of your photos, collections, and stats.
        </p>
        <div className="w-full mt-6">
          <div className="flex justify-center gap-5">
            <div className="w-full">
              <label>Current password</label>

              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
        </div>

        {errorMsg && <p className="text-lg text-red-600 mt-5">{errorMsg}</p>}

        <button
          type="submit"
          className="mt-6 px-4 py-3 rounded-lg cursor-pointer text-white transition-all ease duration-200 bg-linear-to-t from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500"
        >
          {isPending ? "Deleting..." : "Delete account"}
        </button>
      </form>
    </div>
  );
};

export default CloseAccount;
