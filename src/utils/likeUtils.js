const likeUtil = async (token, likedBy, userId, url) => {
  try {
    const isLiked = likedBy.some(id => id === userId);
    let updatedLiked = [];

    isLiked
      ? (updatedLiked = likedBy.filter(id => id !== userId))
      : (updatedLiked = [...likedBy, userId]);

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        likedBy: updatedLiked,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }
};

export default likeUtil;
