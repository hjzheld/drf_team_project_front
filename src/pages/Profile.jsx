import React, { useEffect, useState } from "react";

// js api
import { getUserArticles } from "../js/api/getUserArticles";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    console.log("payload: ", payload);
    const nickname = payload["nickname"];
    const userId = payload["user_id"];

    getUserArticles(userId, setUserArticles);

    setUserId(userId);
    setNickname(nickname);
  }, []);

  console.log("userArticles: ", userArticles);

  return (
    <div>
      <div>
        {userId}
        계정 {nickname}님 개인 프로필 페이지
      </div>
      <button>프로필 수정</button>
    </div>
  );
};

export default Profile;
