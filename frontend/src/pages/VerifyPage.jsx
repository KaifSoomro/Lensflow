import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();

  const { token } = useParams();
  console.log("token: ", token);

  const { data, isLoading } = useQuery({
    queryKey: ["verifyEmail"],
    queryFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/${token}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        })

        const data = await res.json();

        if(!res.ok){
          throw new Error(data.message || "Something went wrong.")
        }

        console.log("data: ", data);

        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  const isVerified = data?.success;

  useEffect(() => {
    if(data?.message === "Email already verified."){
      toast.success(data?.message);
    }
  }, [data])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-10 text-center">
        <div
          className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full ${
            isVerified ? "bg-blue-50" : "bg-red-50"
          }`}
        >
          {isVerified ? (
            <CheckCircle2 size={72} className="text-[#3B82F6]" />
          ) : (
            <XCircle size={72} className="text-[#f63b41]" />
          )}
        </div>

        <h1 className="mt-8 text-3xl font-bold text-[#111827]">
          {isVerified ? "Email Verified!" : "Verification Failed"}
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          {isVerified
            ? "Your email has been successfully verified. You can now log in to your LensFlow account."
            : "The verification link is invalid or has expired. Please request a new verification email and try again."}
        </p>

        {isVerified ? (
          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full rounded-lg bg-[#3B82F6] py-3 text-white font-semibold hover:bg-[#2b72ea] transition-all duration-200 cursor-pointer"
          >
            Continue to Login
          </button>
        ) : (
          <button
            onClick={() => navigate("/resend-verification")}
            className="mt-8 w-full rounded-lg bg-[#3B82F6] py-3 text-white font-semibold hover:bg-[#2b72ea] transition-all duration-200 cursor-pointer"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
