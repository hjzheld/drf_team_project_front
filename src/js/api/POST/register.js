import axios from "axios";

const postRegister = (
  email,
  password,
  nickname,
  mbti,
  blog,
  navigate,
  setErrMsg
) => {
  const userData = JSON.stringify({
    email,
    password,
    nickname,
    mbti,
    blog,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/signup/",
    headers: {
      "Content-Type": "application/json",
    },
    data: userData,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 201) {
        console.log("서버 메세지: ", response.data.message);
        alert("회원가입 완료  로그인 페이지로 이동합니다.");
        navigate("/login", { state: email });
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        setErrMsg("서버 응답 없음");
      } else if (err.response.status === 409) {
        setErrMsg(err.response.data.message);
      } else if (err.response.status === 400) {
        console.log(err);
        setErrMsg(err.response.statusText);
      }
      navigate("/register");
    });
};

export { postRegister };
