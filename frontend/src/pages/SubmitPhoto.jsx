import React, { useState } from "react";
import { ImagePlus, Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../assets/images/empty-upload.png";

const SubmitPhoto = () => {
  const [preview, setPreview] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [imageType, setImageType] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    description: "",
    tags: [],
    type: "",
    category: "",
    orientation: "",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tag = tagInput.trim();

      if (!tag) return;

      if (formData.tags.includes(tag.toLowerCase())) {
        setTagInput("");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag.toLowerCase()],
      }));

      setTagInput("");
    }

    if (e.key === "Backspace" && tagInput === "" && formData.tags.length > 0) {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const { mutate: uploadPhoto, isPending } = useMutation({
    mutationFn: async (data) => {
      const form = new FormData();

      form.append("image", data.image);
      form.append("description", data.description);
      form.append("type", data.type);
      form.append("tags", JSON.stringify(data.tags));

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/photo/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      return result;
    },

    onSuccess: (result) => {
      toast.success(result.message);
      navigate("/");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    if (!formData.image) {
      toast.error("Please select an image first.");
      return;
    }

    console.log(formData);
    uploadPhoto(formData);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900">
            Submit a Photo
          </h1>

          <p className="text-neutral-500 mt-2">
            Share your best work with the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <label
              htmlFor="image"
              className="cursor-pointer h-125 bg-white border-2 border-dashed border-neutral-300 rounded-2xl flex items-center justify-center overflow-hidden hover:border-neutral-500 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <img src={ImageUpload} alt="" />

                  <h2 className="mt-5 text-xl font-semibold">Upload Photo</h2>

                  <p className="text-neutral-500 mt-2">JPG, PNG or WEBP</p>
                </div>
              )}
            </label>

            <input
              hidden
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8">
            <div className="mb-6">
              <label className="font-semibold block mb-2">Description</label>

              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Tell people something about this photo..."
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 resize-none outline-none focus:border-neutral-900"
              />
            </div>

            <div className="mb-6">
              <label className="font-semibold block mb-2">Tags</label>

              <div className="min-h-13 border border-neutral-300 rounded-xl p-2 flex flex-wrap gap-2 focus-within:border-neutral-900">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-neutral-100 border border-neutral-300 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span className="text-sm">{tag}</span>

                    <button type="button" onClick={() => removeTag(index)}>
                      <X
                        size={14}
                        className="text-neutral-500 hover:text-red-500"
                      />
                    </button>
                  </div>
                ))}

                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={
                    formData.tags.length === 0
                      ? "Type a tag and press Enter..."
                      : ""
                  }
                  className="flex-1 min-w-35 outline-none bg-transparent px-2"
                />
              </div>

              <p className="text-sm text-neutral-500 mt-2">
                Press Enter to add each tag.
              </p>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-neutral-900">
                Orientation
              </label>

              <select
                value={formData.orientation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    orientation: e.target.value,
                  }))
                }
                className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white outline-none focus:border-neutral-900 transition"
              >
                <option value="" className="text-neutral-500">
                  Select a orientation
                </option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-neutral-900">
                Category
              </label>

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white outline-none focus:border-neutral-900 transition"
              >
                <option value="" className="text-neutral-500">
                  Select a category
                </option>
                <option value="featured">Featured</option>
                <option value="illustration">Illustration</option>
                <option value="collections">Collections</option>
                <option value="nostalgia">Nostalgia</option>
                <option value="summer">Summer</option>
                <option value="wallpapers">Wallpapers</option>
                <option value="3d-renders">3d Renders</option>
                <option value="nature">Nature</option>
                <option value="texture">Texture</option>
                <option value="film">Film</option>
                <option value="street-photography">Street Photography</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-neutral-900">
                Type
              </label>

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white outline-none focus:border-neutral-900 transition"
              >
                <option value="" className="text-neutral-500">
                  Select a type
                </option>
                <option value="photo">Photo</option>
                <option value="illustration">Illustration</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full h-12 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#3071d9] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <UploadCloud size={18} />
              )}
              {isPending ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPhoto;
