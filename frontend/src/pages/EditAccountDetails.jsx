import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileImage from "../assets/images/profile.webp";

const EditAccountDetails = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto ms-130 px-20 mt-29">
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
          <div className="flex justify-center gap-5 bg-amber-200">
            <div className="w-full">
              <label>First name</label>
              <input
                type="text"
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1.5"
              />
            </div>
            <div className="w-full">
              <label>Last name</label>
              <input
                type="text"
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1.5"
              />
            </div>
          </div>
          <div className="mt-5">
            <label>Email</label>
            <input
              type="email"
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1.5"
            />
          </div>
          <div className="mt-5">
            <label>Username <p>(only letters, numbers, and underscores)</p></label>
            <input
              type="text"
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountDetails;
