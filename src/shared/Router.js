import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Article from "../pages/Article";
import NotFound from "../pages/NotFound";
import Navigation from "../components/Navigation";
import Register from "../pages/Register";
import Tag from "../pages/Tag";
import ProfileUpdate from "../pages/ProfileUpdate";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="/profile/edit/:id" element={<ProfileUpdate />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
