const token = localStorage.getItem("token");

const fetchCollectionPhotoIds = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/user/collection/photoIds`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.collectionPhotoIds;
};

export default fetchCollectionPhotoIds;