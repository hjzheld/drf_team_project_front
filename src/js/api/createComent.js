import axios from "axios";

const createComent = (comment, curArticle, setComment, setCurArticle) => {
  console.log("댓글 작성하기 api", comment);

  const payload = JSON.parse(localStorage.getItem("payload"));
  console.log("payload: ", payload);
  const nickname = payload["nickname"];
  const userId = payload["user_id"];

  const accessToken = localStorage.getItem("access");

  const commentData = JSON.stringify({
    comment,
    user_id: userId,
    article_id: curArticle,
    // nickname,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/articles/${curArticle}/comment/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: commentData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("댓글 달기 성공: ", response);
      setComment("");
      setCurArticle("");
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { createComent };
