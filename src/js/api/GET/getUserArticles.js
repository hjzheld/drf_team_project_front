import axios from "axios";

const getUserArticles = (userId, setUserArticles) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/user/article/${userId}/`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        setUserArticles([...response.data]);
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err.response);
      } else if (err.response?.status === 404) {
        console.log("게시글이 하나도 없어요");
      }
    });
};

export { getUserArticles };
