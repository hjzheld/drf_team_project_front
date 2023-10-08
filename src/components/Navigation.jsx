import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/nav.css";

const Navigation = () => {
  return (
    <>
      <header className="header-wrap">
        <div className="nav-header">
          <Link to="/">Home</Link>
          <nav className="nav-wrap">
            <ul className="nav-container">
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile">My Page</Link>
              </li>
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
