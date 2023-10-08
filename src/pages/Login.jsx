import React from "react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// 디자인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../styles/form.css";

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
          setErrMsg("이메일 혹은 패스워드 오류입니다.");
        } else if (err.response?.status === 401) {
          setErrMsg("유효하지 않은 계정입니다.");
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
        <section className="wrap">
          <h1 className="login-success-message">
            메인 페이지로 이동 중 입니다...
          </h1>
        </section>
      ) : (
        <section className="wrap">
          <div className="form-container login-container">
            <div className="img-sample"></div>
            <div className="form-content login-form">
              <h1>로그인</h1>
              <form className="form-items" onSubmit={onSubmitLoginHandler}>
                <div className="input-wrap">
                  <input
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email Address"
                    required
                  />
                  <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="Password"
                  />
                  <FontAwesomeIcon className="input-icon" icon={faLock} />
                </div>

                <button className="submit-btn" type="submit">
                  로그인
                </button>
              </form>
              <div className="form-footer login-footer">
                <p className="err-text">{errMsg}</p>
                <div className="other-line"></div>
                <div className="other-wrap">
                  <span className="other-text">계정이 없으신가요?</span>
                  <Link className="other-link" to="/register">
                    회원가입
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
