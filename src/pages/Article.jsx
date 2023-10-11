import React, { useEffect, useState } from "react";

// api
import { createArticle } from "../js/api/createArticle";
import { useNavigate } from "react-router-dom";

const Article = () => {
  console.log("Article 컴포넌트 마운트");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const onClickSendArticleHandler = (e) => {
    e.preventDefault();
    createArticle(title, content, tag, navigate, setTitle, setContent);
  };

  return (
    <>
      <div>
        <form onSubmit={onClickSendArticleHandler}>
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <input
              type="text"
              placeholder="태그/카테고리"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
            <textarea
              type="text"
              placeholder="올해 목표를 위한 다짐을 적어보세요!"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
            <button type="submit">목표 등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Article;
