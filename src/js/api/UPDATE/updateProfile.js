import axios from "axios";

const profileUpdate = (
  nickname,
  email,
  mbti,
  blog,
  profile,
  userId,
  setUserInfo
) => {
  console.log("api 요청 ㄱㄱ");

  const accessToken = localStorage.getItem("access");

  console.log("profile??: ", profile);

  const updateData = new FormData();

  updateData.append("nickname", nickname);
  updateData.append("email", email);
  updateData.append("mbti", mbti);
  updateData.append("blog", blog);
  updateData.append("profile", profile, profile.name);

  const config = {
    method: "PUT",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/user/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    data: updateData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("수정 성공: ", response);
      setUserInfo({ ...response.data.data });
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { profileUpdate };
