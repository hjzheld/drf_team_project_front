import axios from "axios";

const getArticles = (setArticles) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/articles/",
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        console.log("articles: ", response.data);
        setArticles([...response.data]);
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { getArticles };
