import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileImage from "../assets/images/profile.webp";

const EditAccountDetails = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto px-20 mt-29">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Edit profile</h1>
        <span className="flex items-center gap-1 bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm shadow">
          <Check size={16} /> Account verified
        </span>
      </div>

      <div className="w-full flex items-start justify-between">
        <div className="w-80 mt-10">
          <div className="group cursor-pointer">
            <img src={ProfileImage} alt="profile_img" className="w-33" />
            <p className="mt-3 underline text-neutral-500 group-hover:text-neutral-800 text-sm ">
              Change profile image
            </p>
          </div>
          <div className="mt-7">
            <h1 className="font-semibold">Badge</h1>
            <p className="text-neutral-500 text-sm font-semibold">
              You don't have any badges yet :(
            </p>
          </div>
        </div>
        <div className="w-full mt-10">
          <div className="flex justify-center gap-5">
            <div className="w-full">
              <label>First name</label>
              <input
                type="text"
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
            <div className="w-full">
              <label>Last name</label>
              <input
                type="text"
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
          <div className="mt-5">
            <label>Email</label>
            <input
              type="email"
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
            />
          </div>
          <div className="mt-5">
            <label className="flex gap-2 items-center">
              Username{" "}
              <p className="text-neutral-600">
                (only letters, numbers, and underscores)
              </p>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
            />
          </div>
        </div>
      </div>
      <h1 className="text-lg font-semibold mt-18">About</h1>
      <div className="flex justify-center gap-5 mt-3">
        <div className="w-full">
          <label>Location</label>
          <input
            type="text"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
          />
        </div>
        <div className="w-full">
          <label>Personal site/portfolio</label>
          <input
            type="text"
            placeholder="https://"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
          />
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-8">
        <div className="w-full">
          <label>Bio</label>
          <textarea
            cols="30"
            rows="10"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1 max-h-30"
          ></textarea>
        </div>
        <div className="w-full">
          <label>
            Interests <span className="text-neutral-600">(maximum 5)</span>
          </label>
          <input
            type="text"
            placeholder="https://"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
          />
          <p className="mt-3 text-neutral-600">
            Your interests are generated from the types of photos you like,
            collect, and contribute.
          </p>
        </div>
      </div>

      <h1 className="text-lg font-semibold mt-10">Social</h1>

      <div className="flex justify-center gap-5 mt-3">
        <div className="w-full">
          <label>Instagram username</label>
          <input
            type="text"
            placeholder="@username"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
          />
          <p className="mt-2 text-neutral-600">
            So that we can feature you on @lensflow
          </p>
        </div>
        <div className="w-full">
          <label>X (Twitter) username</label>
          <input
            type="text"
            placeholder="@username"
            className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
          />
          <p className="mt-2 text-neutral-600">
            So that we can feature you on @lensflow
          </p>
        </div>
      </div>
      <button className="mt-12 w-full px-2 py-3 rounded-lg cursor-pointer text-white transition-all ease duration-200 font-semibold bg-linear-to-t from-neutral-900 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700">
        Update account
      </button>
    </div>
  );
};

export default EditAccountDetails;
