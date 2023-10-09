// 이메일 검사 정규 표현식
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 영문 숫자 조합 8자리 이상
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

const confirmTestFn = (email, password, passwordCheck, setErrMsg) => {
  const checkEmail = EMAIL_REGEX.test(email);
  const checkPWD = PWD_REGEX.test(password);

  if (!checkEmail) {
    setErrMsg("이메일 양식을 맞춰서 작성하세요.");
    console.log("이메일 양식 오류");
    return null;
  } else if (!checkPWD) {
    console.log("비밀번호 조합 오류");
    setErrMsg("비밀번호는 영문, 숫자 조합 8자리 이상을 사용하세요.");
    return null;
  } else if (password !== passwordCheck) {
    console.log("비밀번호 둘이 다름 오류");
    setErrMsg("비밀번호가 일치하지 않습니다.");
    return null;
  }
};

export { confirmTestFn, EMAIL_REGEX, PWD_REGEX };
