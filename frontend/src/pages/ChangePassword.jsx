import React, { useState } from "react";

const ChangePassword = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
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

        <button
          type="submit"
          className="mt-6 w-full px-2 py-3 rounded-lg cursor-pointer text-white transition-all ease duration-200 bg-linear-to-t from-neutral-900 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700"
        >
          Change password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
