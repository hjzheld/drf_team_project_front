import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// 디자인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../styles/form.css";

// js 파일
import { postLogin } from "../js/api/login";

const Login = () => {
  // 현재 로그인한 상태인지 토큰 값이 있는지로 확인
  const onLogin = () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      navigate("/");
    }
  };

  const navigate = useNavigate();

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 로그인 버튼 클릭
  const onSubmitLoginHandler = async (e) => {
    e.preventDefault();
    // 로그인 요청 api
    postLogin(email, password, setEmail, setPassword, setSuccess, setErrMsg);
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

  // 현재 로그인 상태인가 확인
  // 로그인 완료된 유저라면 로그인 버튼이 안보이겠지만 url을 통한 로그인 시도를 차단하기 위함
  useEffect(() => {
    onLogin();
  }, []);

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
