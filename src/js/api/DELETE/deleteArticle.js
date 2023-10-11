import axios from "axios";

const onClickDeleteArticle = (articleId, articles, setArticles) => {
  const accessToken = localStorage.getItem("access");

  const deleteData = JSON.stringify({
    article_id: articleId,
  });

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/articles/${articleId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: deleteData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("게시글 삭제 성공: ", response);
      articles.filter((article) => {
        return articleId !== article.id;
      });
      setArticles([
        ...articles.filter((article) => {
          return articleId !== article.id;
        }),
      ]);
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { onClickDeleteArticle };
