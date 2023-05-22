const calcTimePassed = postedAt => {
  const timePassed = Date.now() - new Date(postedAt);
  const minutePassed = Math.floor(timePassed / 1000 / 60);

  if (minutePassed < 1) return "Just now";

  if (minutePassed < 60) return `${minutePassed} minutes ago`;

  if (minutePassed < 1440) return `${Math.floor(minutePassed / 60)} hours ago`;

  if (minutePassed < 10080) return `${Math.floor(minutePassed / 60 / 24)} days ago`;

  return `${new Date(postedAt).getDate()}/${new Date(postedAt).getMonth() + 1}/${new Date(
    postedAt
  ).getFullYear()}`;
};

export default calcTimePassed;
