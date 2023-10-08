import axios from "axios";
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

const Register = () => {
  console.log("Register 컴포넌트 마운트");
  // 이메일 검사 정규 표현식
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // 영문 숫자 조합 8자리 이상
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

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
    const checkEmail = EMAIL_REGEX.test(email);
    const checkPWD = PWD_REGEX.test(password);

    if (!checkEmail) {
      setErrMsg("이메일 양식을 맞춰서 작성하세요.");
      return;
    } else if (!checkPWD) {
      setErrMsg("비밀번호는 영문, 숫자 조합 8자리 이상을 사용하세요.");
      return;
    } else if (password !== passwordCheck) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

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
        console.log(JSON.stringify(response.data));
        if (response.status === 201) {
          console.log("서버 메세지: ", response.data.message);
          alert("회원가입 완료  로그인 페이지로 이동합니다.");
          navigate("/login");
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
