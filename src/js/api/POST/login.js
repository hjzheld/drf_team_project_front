import axios from "axios";

const postLogin = (
  email,
  password,
  setEmail,
  setPassword,
  setSuccess,
  setErrMsg
) => {
  const loginData = JSON.stringify({
    email,
    password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/api/token/",
    headers: {
      "Content-Type": "application/json",
    },
    data: loginData,
  };

  axios
    .request(config)
    .then((response) => {
      //로그인 성공
      const userAccess = response.data.access;
      const userRefresh = response.data.refresh;

      localStorage.setItem("access", userAccess);
      localStorage.setItem("refresh", userRefresh);

      const base64Url = userAccess.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      localStorage.setItem("payload", jsonPayload);

      setEmail("");
      setPassword("");
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        setErrMsg("서버 응답 없음");
      } else if (err.response?.status === 400) {
        setErrMsg("이메일 혹은 패스워드 오류입니다.");
      } else if (err.response?.status === 401) {
        setErrMsg("유효하지 않은 계정입니다.");
      } else {
        setErrMsg("로그인 실패");
      }
    });
};

export { postLogin };
