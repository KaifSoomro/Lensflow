import { Check, XIcon } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileImage from "../assets/images/profile.webp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const EditAccountDetails = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user._id;
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(ProfileImage);

  const [formData, setFormData] = useState({
    profileImage: "",
    fullName: "",
    email: "",
    userName: "",
    location: "",
    website: "",
    bio: "",
    available: false,
  });

  const fileInputRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data?.user;
    },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        profileImage: data.profileImage || "",
        fullName: data.fullName || "",
        email: data.email || "",
        userName: data.userName || "",
        location: data.location || "",
        website: data.website || "",
        bio: data.bio || "",
        available: data.available || false,
      });

      if (data.profileImage) {
        setImagePreview(data.profileImage.url);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;

      setProfileImage(base64);
      setImagePreview(base64);

      console.log("Base64:", base64);
    };

    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (submitData) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile/update`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
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
      queryClient.invalidateQueries({
        queryKey: ["profileData", userId]
      })
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      profileImage: profileImage,
    };

    console.log("Submit Data:", submitData);
    console.log("Profile Image:", profileImage);

    updateProfile(submitData);
  };

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-20 mt-29">
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Edit profile</h1>

          {data?.isVerified ? (
            <span className="flex items-center gap-1 bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm shadow">
              <Check size={16} />
              Account verified
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm shadow">
              <XIcon size={16} />
              Not verified yet
            </span>
          )}
        </div>

        <div className="w-full flex items-start justify-between">
          <div className="w-80 mt-10">
            <div
              className="group cursor-pointer w-fit"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview}
                alt="profile_img"
                className="w-33 h-33 object-cover rounded-full"
              />

              <p className="mt-3 underline text-neutral-500 group-hover:text-neutral-800 text-sm">
                Change profile image
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

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
                <label>Full name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
                />
              </div>
            </div>

            <div className="mt-5">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>

            <div className="mt-5">
              <label className="flex gap-2 items-center">
                Username
                <p className="text-neutral-600">
                  (only letters, numbers, and underscores)
                </p>
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
              />
            </div>
          </div>
        </div>

        <h1 className="text-lg font-semibold mt-15">About</h1>

        <div className="flex justify-center gap-5 mt-3">
          <div className="w-full">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
            />
          </div>

          <div className="w-full">
            <label>Personal site/portfolio</label>

            <input
              type="text"
              name="website"
              placeholder="https://"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-8">
          <div className="w-full">
            <label>Bio</label>

            <textarea
              name="bio"
              cols="30"
              rows="10"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg outline-none px-3 py-1.5 mt-1 max-h-30"
            />
          </div>
        </div>

        <div className="w-full flex items-center gap-5">
          <div className="w-full">
            <h1 className="text-lg font-semibold mt-10">Hiring</h1>

            <div className="w-full h-10 bg-neutral-100 flex items-center gap-2.5 px-3 py-6 rounded-md mt-3">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />

              <p>Yes, feature my Lensflow profile on hiring pages.</p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-20 w-full px-2 py-3 rounded-lg cursor-pointer text-white transition-all ease duration-200 bg-linear-to-t from-neutral-900 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700"
          >
            { isPending ? "Updating..." : "Update account" }
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountDetails;
