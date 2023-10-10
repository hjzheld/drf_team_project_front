import axios from "axios";

const getUserArticles = (userId, setUserArticles) => {
  console.log("userId: ", userId);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/articles/${userId}/`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        console.log("response: ", response);
        setUserArticles([...response.data]);
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { getUserArticles };
