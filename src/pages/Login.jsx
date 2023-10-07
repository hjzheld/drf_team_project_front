import React from "react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 로그인 버튼 클릭
  const onSubmitLoginHandler = async (e) => {
    e.preventDefault();

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
        console.log(JSON.stringify(response.data));
        setEmail("");
        setPassword("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          setErrMsg("서버 응답 없음");
        } else if (err.response?.status === 400) {
          setErrMsg("이메일 혹은 패스워드 오류");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("로그인 실패");
        }
      });
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // 로그인 성공시 1초뒤 메인 페이지로 이동
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [success]);

  return (
    <>
      {success ? (
        <section>
          <h1>로그인 성공 메인 페이지로 이동합니다.</h1>
        </section>
      ) : (
        <section>
          <p>{errMsg}</p>
          <h1>로그인 페이지</h1>
          <form onSubmit={onSubmitLoginHandler}>
            <input
              type="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>로그인</button>
          </form>
          <p>
            계정 없음?
            <span className="line">
              <Link to="/register">회원가입</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
