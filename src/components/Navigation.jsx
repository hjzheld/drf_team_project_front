import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// 디자인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/nav.css";

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");

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
    }
  }, [isLogin, nickname]);

  return (
    <>
      <header className="header-wrap">
        <div className="nav-header">
          <Link to="/">
            <h1 className="header-logo">올해 목표는</h1>
          </Link>
          <nav className="nav-wrap">
            <ul className="nav-container">
              {isLogin ? (
                <div className="nav-login_container">
                  <Link className="nav-item create-item" to="/article">
                    <li>새로운 목표 만들기</li>
                  </Link>
                  <div
                    className="icon-container"
                    onClick={clickUserIconHandler}
                  >
                    <FontAwesomeIcon
                      className="icon-user"
                      icon={faCircleUser}
                    />
                    <FontAwesomeIcon className="icon-down" icon={faCaretDown} />
                    <ul
                      className={
                        activeIcon ? "login-list" : "login-list active"
                      }
                    >
                      <Link
                        className="login-list_item"
                        to={isLogin ? `/profile/:${userId}` : "/login"}
                      >
                        <li>내 게시글</li>
                      </Link>
                      <li className="login-list_item">프로필 수정</li>
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
