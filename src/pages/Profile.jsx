import React, { useEffect, useState } from "react";

// js api
import { getUserArticles } from "../js/api/getUserArticles";
import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
  // url에서 값을 받아오기 위한 hook
  const params = useParams();
  // navi로 url 변경시에 데이터를 받아오기 위한 hook
  const { state } = useLocation();

  // api 요청으로 개인 유저의 게시물을 가져와서 담을 hook
  const [userArticles, setUserArticles] = useState([]);

  const [isValidUser, setIsValidUser] = useState(false);
  const [storageUserNickname, setStorageUserNickname] = useState("");
  const [storageUserId, setStorageUserId] = useState("");

  // 현재 프로필을 보고 있는 유저가 본인 게시물을 보는지 확인하기 위해 사용
  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    console.log("payload: ", payload);
    const nickname = payload["nickname"];
    const userId = payload["user_id"];
    setStorageUserNickname(nickname);
    setStorageUserId(userId);
  }, []);

  const clickedUserId = params.id;
  const clickedUserNickname = state;

  useEffect(() => {
    setIsValidUser(parseInt(clickedUserId) === parseInt(storageUserId));
  });

  // 페이지 렌더시에 url에서 받아온 값으로 해당 유저의 게시글만 가져오는 api
  useEffect(() => {
    getUserArticles(params.id, setUserArticles);
  }, []);

  console.log("isValidUser: ", isValidUser);
  console.log("clickedUserId: ", clickedUserId);
  console.log("clickedUserNickname: ", clickedUserNickname);
  console.log("userArticles: ", userArticles);
  console.log("state:", state);
  return (
    <div>
      <div>
        {params.id}번 계정의 {state}님 개인 프로필 페이지
      </div>
      {userArticles.length === 0 ? (
        <h1>올해 목표를 하나도 만들지 않았어요!</h1>
      ) : (
        userArticles.map((article) => {
          return (
            <div key={article.id}>
              <div>{article.title}</div>
              <div>{article.contnet}</div>
              <div>{article.tag}</div>
              {isValidUser ? <button>게시글 수정 버튼</button> : ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Profile;
