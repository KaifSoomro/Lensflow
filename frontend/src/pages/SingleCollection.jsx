import React from "react";
import { useParams } from "react-router-dom";

const SingleCollection = () => {
  const { collectionId } = useParams();
  return <div>SingleCollection: { collectionId }</div>;
};

export default SingleCollection;
