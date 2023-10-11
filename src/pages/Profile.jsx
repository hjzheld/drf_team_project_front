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
      {userArticles.length === 0 ? (
        <h1>올해 목표를 하나도 만들지 않았어요!</h1>
      ) : (
        userArticles.map((article) => {
          return (
            <div key={article.pk}>
              <div>{article.title}</div>
              <div>{article.contnet}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Profile;
