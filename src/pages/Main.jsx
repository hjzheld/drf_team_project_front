import React, { useEffect, useState } from "react";
import { getArticles } from "../js/api/getArticles";

const Main = () => {
  const [articles, setArticles] = useState([]);

  // 렌더링할때 api 요청으로 state에 모든 유저의 게시물 저장
  useEffect(() => {
    getArticles(setArticles);
  }, []);

  console.log("articles: ", articles);

  return (
    <div>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <div>{article.title}</div>
            <div>{article.content}</div>
            <div>{article.created_at}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
