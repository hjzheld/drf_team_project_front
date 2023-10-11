import axios from "axios";

const createArticle = (
  title,
  content,
  tagNumber,
  picture,
  navigate,
  setTitle,
  setContent,
  setTagText,
  setPicture
) => {
  const accessToken = localStorage.getItem("access");

  console.log("picture??: ", picture);

  const articleData = new FormData();

  articleData.append("title", title);
  articleData.append("content", content);
  articleData.append("tag_id", tagNumber);
  // articleData.append("image", picture, picture.name);

  // const articleData = {
  //   title,
  //   content,
  //   tag_id_id: tag,
  //   image: picture,
  // };

  console.log("tagNumber: ", tagNumber);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/articles/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    data: articleData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("요청 성공: ", response);
      setTitle("");
      setContent("");
      setTagText("");
      setPicture("");
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
