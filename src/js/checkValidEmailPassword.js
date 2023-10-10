// 이메일 검사 정규 표현식
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 영문 숫자 조합 8자리 이상
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

const checkIsValidEmailAndPassword = (
  email,
  password,
  passwordCheck,
  setErrMsg
) => {
  const checkEmail = EMAIL_REGEX.test(email);
  const checkPassword = PWD_REGEX.test(password);

  let isPassed = false;

  if (!checkEmail) {
    setErrMsg("이메일 양식을 맞춰서 작성하세요.");
    return isPassed;
  } else if (!checkPassword) {
    setErrMsg("비밀번호는 영문, 숫자 조합 8자리 이상을 사용하세요.");
    return isPassed;
  } else if (password !== passwordCheck) {
    setErrMsg("비밀번호가 일치하지 않습니다.");
    return isPassed;
  } else {
    isPassed = true;
    return isPassed;
  }
};

export { checkIsValidEmailAndPassword, EMAIL_REGEX, PWD_REGEX };
