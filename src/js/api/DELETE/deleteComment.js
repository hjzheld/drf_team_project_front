import axios from "axios";

const deleteOnlyMyComment = (
  articleId,
  commnetId,
  comment,
  setComment,
  comments,
  articles,
  setArticles
) => {
  const accessToken = localStorage.getItem("access");

  console.log("-----------------------------");
  console.log("articleId: ", articleId);
  console.log("commnetId: ", commnetId);
  console.log("-----------------------------");

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/articles/${articleId}/comment/${commnetId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log("댓글 삭제 성공: ", response);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { deleteOnlyMyComment };
