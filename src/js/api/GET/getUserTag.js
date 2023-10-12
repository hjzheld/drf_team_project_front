import axios from "axios";

const getUserTag = (nickname, storageName, setUserTags) => {
  console.log("함수실행");
  let urlInputNickname = nickname;

  if (nickname === null) {
    urlInputNickname = storageName;
  }

  console.log("urlInputNickname: ", urlInputNickname);

  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/tag/${urlInputNickname}/`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      setUserTags([...response.data]);
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 404) {
        console.log("가지고오는");
      }
    });
};

export { getUserTag };
