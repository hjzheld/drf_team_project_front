import axios from "axios";

const getUserAchievementRate = (
  clickedUserNickname,
  storageUserNickname,
  setUserRate
) => {
  const accessToken = localStorage.getItem("access");

  let urlInputNickname = clickedUserNickname;

  if (urlInputNickname === null) {
    urlInputNickname = storageUserNickname;
  }

  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/tag/${urlInputNickname}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      setUserRate([...response.data]);
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { getUserAchievementRate };
