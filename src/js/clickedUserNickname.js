const onClickUserNicknameHandler = (userID, navigate, nickname) => {
  navigate(`/profile/${userID}`, { state: nickname });
  // navigate("/register");
  // 모든 유저들의 정보를 가지고 오는 api 만들어달라하기
  // 모든 유저가 들어있는 변수에서 현재 클릭한 유저와 같은 유저닉네임을 찾아서
  // 해당 닉네임의 유저 고유 int 값을 가져오기
  // 가져온 값을 리턴하고 해당 값을 url에 넣어줘서 각각의 프로필 페이지로 이동할 수 있도록
};

export { onClickUserNicknameHandler };
