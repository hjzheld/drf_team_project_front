import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// 디자인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/nav.css";

// 컴포넌트
import Countdown from "./Countdown";
import { getUserInfoData } from "../js/api/GET/getUserInfo";

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  // 유저 인포
  const [userInfo, setUserInfo] = useState({});

  const param = useParams();

  const [activeIcon, setActiveIcon] = useState("false");

  const navigate = useNavigate();

  const clickLoginOutBtnHandler = () => {
    localStorage.clear();
    navigate("/");
    setIsLogin(false);
  };

  const clickUserIconHandler = () => {
    setActiveIcon((activeIcon) => !activeIcon);
  };

  // 렌더링시에 토큰값 확인해서 로그인 상태를 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setIsLogin(true);

      const payload = JSON.parse(localStorage.getItem("payload"));
      const nickname = payload["nickname"];
      const userId = payload["user_id"];
      setUserId(userId);
      setNickname(nickname);
      console.log("네비아이디: ", userId);
      getUserInfoData(userId, setUserInfo);
    }
  }, [isLogin, nickname]);

  console.log("네비 인포: ", userInfo.profile);

  return (
    <>
      <header className="header-wrap">
        <div className="nav-header">
          <Link to="/">
            <h1 className="header-logo">올해 목표는</h1>
          </Link>
          <Countdown />
          <nav className="nav-wrap">
            <ul className="nav-container">
              {isLogin ? (
                <div className="nav-login_container">
                  <Link className="nav-item create-item" to={`/tag/${userId}`}>
                    <li>새로운 목표 만들기</li>
                  </Link>
                  <Link
                    className="nav-item create-item"
                    to={`/article/${userId}`}
                  >
                    <li>목표 계획하기</li>
                  </Link>
                  <div
                    className="icon-container"
                    onClick={clickUserIconHandler}
                  >
                    {userInfo.profile !==
                    "/media/uploads/profiles/default_profile.png" ? (
                      <img
                        className="navi-profile"
                        src={`http://localhost:8000${userInfo.profile}`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="icon-user"
                        icon={faCircleUser}
                      />
                    )}

                    <FontAwesomeIcon className="icon-down" icon={faCaretDown} />
                    <ul
                      className={
                        activeIcon ? "login-list" : "login-list active"
                      }
                    >
                      <Link
                        className="login-list_item"
                        to={isLogin ? `/profile/${userId}` : "/login"}
                      >
                        <li>내 게시글</li>
                      </Link>
                      <Link
                        className="login-list_item"
                        to={isLogin ? `/profile/edit/${userId}` : "/login"}
                      >
                        <li>프로필 수정</li>
                      </Link>
                      <li
                        className="login-list_item"
                        onClick={clickLoginOutBtnHandler}
                      >
                        로그아웃
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <Link className="nav-item login-item" to="/login">
                    <li>로그인</li>
                  </Link>
                  <Link className="nav-item signup-item" to="/register">
                    <li>회원가입</li>
                  </Link>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
