import { ChevronLeft, Loader2, Plus, Search, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowDialog,
  setToggleCreateCollection,
} from "../../features/collectionSlice";
import { BsLockFill } from "react-icons/bs";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import CollectionCard from "./CollectionCard";

const CollectionBox = () => {
  const dispatch = useDispatch();
  const { toggleCreateCollection, photoId } = useSelector(
    (state) => state.collection,
  );
  const [name, setName] = useState("");
  const [private_value, setPrivateValue] = useState(true);
  const token = localStorage.getItem("token");

  const collectionData = {
    collectionName: name,
    isPrivate: private_value,
    photoId: photoId,
  };

  const length = Number(collectionData.collectionName.length);
  const max = 60 - length;

  const handleNameInput = (e) => {
    if (length <= 60) {
      setName(e.target.value);
    }
  };

  const closeCollectionDialog = () => {
    dispatch(setShowDialog(false));
  };

  const { mutate: createNewCollection, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionData),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setToggleCreateCollection(false));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCollection();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["collectionData"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/collection/getAll`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data?.collections;
      } catch (error) {
        throw error;
      }
    },
  });

  console.log(data);

  return (
    <>
      {toggleCreateCollection ? (
        <form onSubmit={handleSubmit}>
          <div className="relative w-120 h-90 rounded-2xl bg-white flex flex-col items-center justify-start">
            <div className="w-full flex items-center gap-5 border-b pb-4 border-neutral-400 px-7 pt-5">
              <button
                onClick={() => dispatch(setToggleCreateCollection(false))}
                className="text-neutral-500 hover:text-neutral-800 cursor-pointer transition-all"
              >
                <ChevronLeft />
              </button>
              <h1 className="font-semibold text-lg">Create a new collection</h1>
            </div>
            <div className="w-full pt-3 px-7">
              <div className="flex flex-col">
                {" "}
                <label htmlFor="name" className="text-lg text-neutral-600">
                  Name
                </label>
                <div
                  className={`flex items-center justify-between border border-neutral-500 rounded-xl py-2 px-2 mt-2.5`}
                >
                  <input
                    type="text"
                    className="border-none outline-none w-80"
                    placeholder="Beautiful photos"
                    value={name}
                    maxLength={60}
                    onChange={handleNameInput}
                  />
                  <p className="text-neutral-500">{max}</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      value={private_value}
                      onChange={(e) => setPrivateValue(e.target.checked)}
                      checked={private_value}
                    />
                    <span className="flex items-center gap-1.5">
                      Private <BsLockFill />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full flex items-center gap-3 border-t border-neutral-400 px-7 py-3">
              <button
                type="button"
                onClick={() => dispatch(setToggleCreateCollection(false))}
                className="rounded-xl transition-all ease-in px-3 py-2.5 cursor-pointer font-semibold text-neutral-500 border border-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl transition-all ease-in px-3 py-2.5 cursor-pointer font-semibold bg-blue-600 text-white"
              >
                {isPending ? (
                  <Loader2
                    size={15}
                    className="animate-spin transition-all duration-200"
                  />
                ) : (
                  "Create collection"
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="relative w-120 h-120 rounded-2xl bg-white flex flex-col items-center justify-start">
          <div className="w-full flex items-center justify-between border-b pb-4 border-neutral-400 px-7 pt-5">
            <Search size={25} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Find a collection"
              className="w-full ps-6 border-none outline-none"
            />
            <button
              title="Close"
              onClick={closeCollectionDialog}
              className="cursor-pointer group"
            >
              <XIcon
                size={30}
                className="text-neutral-400 group-hover:text-neutral-600 transition-all ease"
              />
            </button>
          </div>
          <div className="w-full pt-3 px-7">
            <div className="flex items-center justify-start">
              <h1 className="text-md text-neutral-500 mt-3 px-3">A-Z</h1>
            </div>
            {Array.isArray(data) &&
              data.map((collection, index) => (
                <CollectionCard
                  key={index}
                  collection={collection}
                  isLoading={isLoading}
                />
              ))}
          </div>
          <div className="absolute bottom-0 w-full border-t border-neutral-400 p-3">
            <button
              className="w-full flex items-center gap-3 rounded-md hover:bg-neutral-100 transition-all ease-in px-3 py-2.5 cursor-pointer font-semibold"
              onClick={() => dispatch(setToggleCreateCollection(true))}
            >
              <Plus />
              Create a new collection
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionBox;
