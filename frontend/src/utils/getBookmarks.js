const token = localStorage.getItem("token");

export const fetchBookmarkIds = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/user/get/bookmarksId`,
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

  return data.bookmarksId;
};