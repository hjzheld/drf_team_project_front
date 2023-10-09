import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
// 디자인
import "../styles/nav.css";

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);

  const clickLoginOutBtnHandler = () => {
    localStorage.clear();
    console.log("클릭완료");
    setIsLogin(false);
  };

  // 렌더링시에 토큰값 확인해서 로그인 상태를 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <>
      <header className="header-wrap">
        <div className="nav-header">
          <Link to="/">홈</Link>
          <nav className="nav-wrap">
            <ul className="nav-container">
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link to="/article">글작성</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile">마이페이지</Link>
                  </li>
                  <li className="nav-item" onClick={clickLoginOutBtnHandler}>
                    로그아웃
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">로그인</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register">회원가입</Link>
                  </li>
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
