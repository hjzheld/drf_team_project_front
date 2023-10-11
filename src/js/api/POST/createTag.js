import axios from "axios";

const createTag = (tag, setTag, navigate, setErrMsg) => {
  const accessToken = localStorage.getItem("access");

  const tagData = JSON.stringify({
    tag_name: tag,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/tag/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: tagData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("요청 성공: ", response);
      setTag("");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      } else if (err.response?.status === 409) {
        setErrMsg("이미 존재하는 목표입니다.");
      }
    });
};

export { createTag };
