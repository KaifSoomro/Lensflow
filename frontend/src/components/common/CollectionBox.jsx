import { XIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDialog } from "../../features/collectionSlice";

const CollectionBox = () => {
  const dispatch = useDispatch();
  const closeCollectionDialog = () => {
    dispatch(setShowDialog(false));
  };
  return (
    <div className="relative w-120 h-120 rounded-2xl bg-white flex items-center justify-center">
      <button
        title="Close"
        onClick={closeCollectionDialog}
        className="absolute top-5 right-5 cursor-pointer"
      >
        <XIcon size={30}/>
      </button>
    </div>
  );
};

export default CollectionBox;
