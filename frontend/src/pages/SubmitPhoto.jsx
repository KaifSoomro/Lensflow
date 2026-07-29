import React, { useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";

const SubmitPhoto = () => {
  const [preview, setPreview] = useState(null);
  const [tagInput, setTagInput] = useState("");

  const [data, setData] = useState({
    image: "",
    description: "",
    tags: [],
  });

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);

      setData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.onerror = (err) => console.log(err);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    convertToBase64(file);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tag = tagInput.trim();

      if (!tag) return;

      if (data.tags.includes(tag.toLowerCase())) {
        setTagInput("");
        return;
      }

      setData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag.toLowerCase()],
      }));

      setTagInput("");
    }

    if (e.key === "Backspace" && tagInput === "" && data.tags.length > 0) {
      setData((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  const removeTag = (index) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!data.image) {
      alert("Please upload an image.");
      return;
    }

    console.log(data);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-14 px-5">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
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
                  <ImagePlus
                    size={60}
                    className="mx-auto text-neutral-400"
                  />

                  <h2 className="mt-5 text-xl font-semibold">
                    Upload Photo
                  </h2>

                  <p className="text-neutral-500 mt-2">
                    JPG, PNG or WEBP
                  </p>
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

            <div className="mb-8">
              <label className="font-semibold block mb-2">
                Description
              </label>

              <textarea
                rows={6}
                value={data.description}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Tell people something about this photo..."
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 resize-none outline-none focus:border-neutral-900"
              />
            </div>

            <div className="mb-8">
              <label className="font-semibold block mb-2">
                Tags
              </label>

              <div className="min-h-13 border border-neutral-300 rounded-xl p-2 flex flex-wrap gap-2 focus-within:border-neutral-900">

                {data.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-neutral-100 border border-neutral-300 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span className="text-sm">{tag}</span>

                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                    >
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
                    data.tags.length === 0
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

            <button
              onClick={handleSubmit}
              className="w-full h-12 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-black transition flex items-center justify-center gap-2"
            >
              <UploadCloud size={18} />
              Upload Photo
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SubmitPhoto;