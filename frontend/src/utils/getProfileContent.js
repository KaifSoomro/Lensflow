const getProfileContent = async (photoType, token) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/profile/content/${photoType}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data?.content;
};

export default getProfileContent;
