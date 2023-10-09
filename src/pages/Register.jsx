import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 디자인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faM,
  faBlog,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/form.css";

// js 파일
import { confirmTestFn, EMAIL_REGEX, PWD_REGEX } from "../js/ConfirmedFn";
import { postRegister } from "../js/api/register";

const Register = () => {
  console.log("Register 컴포넌트 마운트");
  // const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  // const [imgFile, setImgFile] = useState();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [nickname, setNickname] = useState("");
  const [mbti, setMbti] = useState("");
  const [blog, setBlog] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  // 회원가입 클릭
  const onSubmitSignupHandler = async (e) => {
    e.preventDefault();

    // 이메일 / 패스워드 유효성 검사 통과하는지 확인
    // 리턴값으로 null을 넘겨받으면 실행 X
    if (confirmTestFn(email, password, passwordCheck, setErrMsg) === null) {
      return;
    } else {
      // 회원가입 요청 api
      postRegister(email, password, nickname, mbti, blog, navigate, setErrMsg);
    }
  };

  // 이메일 유효성 검사
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setIsPasswordConfirmed(password === passwordCheck);
  }, [password, passwordCheck]);

  // 에러 메세지가 나오고 다시 입력창에 값을 넣으면 비활성화
  useEffect(() => {
    setErrMsg("");
  }, [email, password, isPasswordConfirmed]);

  return (
    <section className="wrap">
      <div className="form-container">
        <div className="img-sample"></div>
        <div className="form-content">
          <h1>회원가입</h1>
          <form className="form-items" onSubmit={onSubmitSignupHandler}>
            {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImgFile(e.target.files[0])}
          required
        /> */}
            <div className="input-wrap">
              <input
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                required
                placeholder="Username"
              />
              <FontAwesomeIcon className="input-icon" icon={faUser} />
            </div>
            <div className="input-wrap">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                name="email"
                placeholder="Email Address"
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
            <div className="input-wrap">
              <input
                type="password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
                required
                placeholder="Confirm Password"
              />
              <FontAwesomeIcon className="input-icon" icon={faLock} />
            </div>
            <div className="input-wrap option-line">
              <div className="option-text">Option</div>
            </div>
            <div className="input-wrap">
              <input
                type="text"
                onChange={(e) => setBlog(e.target.value)}
                value={blog}
                placeholder="Blog Address"
              />
              <FontAwesomeIcon className="input-icon" icon={faBlog} />
            </div>
            <div className="input-wrap">
              <input
                type="text"
                onChange={(e) => setMbti(e.target.value)}
                value={mbti}
                placeholder="MBTI"
              />
              <FontAwesomeIcon className="input-icon" icon={faM} />
            </div>

            <button className="submit-btn" type="submit">
              가입하기
              <FontAwesomeIcon className="btn-icon" icon={faArrowRight} />
            </button>
          </form>
          <div className="form-footer">
            <p className="err-text" ref={errRef}>
              {errMsg}
            </p>
            <div className="other-line"></div>
            <div className="other-wrap">
              <span className="other-text">이미 가입하셨나요?</span>
              <Link className="other-link" to="/login">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
