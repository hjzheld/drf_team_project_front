import axios from "axios";

const createArticle = (title, content, tag, navigate, setTitle, setContent) => {
  const accessToken = localStorage.getItem("access");

  const articleData = JSON.stringify({
    title,
    content,
    tag,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/articles/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: articleData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("요청 성공: ", response);
      setTitle("");
      setContent("");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { createArticle };
