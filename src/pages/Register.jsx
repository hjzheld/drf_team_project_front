import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  console.log("Register 컴포넌트 마운트");
  // 이메일 검사 정규 표현식
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // 영문 숫자 조합 8자리 이상
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  // const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState();
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
    }

    const userData = new FormData();

    userData.append("profile", imgFile);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("nickname", nickname);
    userData.append("mbti", mbti);
    userData.append("blog", blog);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup/",
        userData
      );
      if (response.status === 201) {
        console.log("서버 메세지: ", response.data.message);
        alert("회원가입 완료  로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("서버 응답 없음");
      } else if (err.response.status === 409) {
        setErrMsg(err.response.data.message);
      } else if (err.response.status === 400) {
        console.log(err);
        setErrMsg(err.response.statusText);
      }
      navigate("/register");
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
    <section>
      <h1>회원가입 페이지</h1>
      <div>이미 가입하셨나요?</div>
      <Link to="/login">Login</Link>
      <div>배너 이미지</div>
      <form onSubmit={onSubmitSignupHandler}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImgFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          name="email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input
          type="password"
          placeholder="Repeat Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          value={passwordCheck}
          required
        />
        <input
          type="text"
          placeholder="Nick Name"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          required
        />
        <input
          type="text"
          placeholder="Mbti"
          onChange={(e) => setMbti(e.target.value)}
          value={mbti}
        />
        <input
          type="text"
          placeholder="Blog"
          onChange={(e) => setBlog(e.target.value)}
          value={blog}
        />
        <button disabled={!isPasswordConfirmed} type="submit">
          회원가입
        </button>
      </form>
      <p ref={errRef}>{errMsg}</p>
    </section>
  );
};

export default Register;
