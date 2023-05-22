import { UPDATE_ME_SERVICE } from "../service";

const followUser = async (token, followingList, userId) => {
  try {
    const isFollowing = followingList.some(id => id === userId);
    let updatedFollowing = [];

    isFollowing
      ? (updatedFollowing = followingList.filter(id => id !== userId))
      : (updatedFollowing = [...followingList, userId]);

    const res = await fetch(UPDATE_ME_SERVICE, {
      method: "PATCH",
      body: JSON.stringify({
        following: updatedFollowing,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.user.following;
  } catch (error) {
    throw error;
  }
};

export default followUser;
