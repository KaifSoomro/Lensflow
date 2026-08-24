import { Check } from "lucide-react";
import React from "react";

const EditAccountDetails = () => {
  return (
    <div className="max-w-7xl mx-auto ms-130 px-20 mt-29">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Edit profile</h1>
        <span className="flex items-center gap-1 bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm shadow">
          <Check size={16} /> Account verified
        </span>
      </div>

      <div className="w-full flex items-center">
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default EditAccountDetails;
