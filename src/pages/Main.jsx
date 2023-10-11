import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// js api
import { getArticles } from "../js/api/getArticles";
import { getTags } from "../js/api/getTags";
import { createComent } from "../js/api/createComent";
// js
import { onClickUserNicknameHandler } from "../js/clickedUserNickname";

// 스타일
import "../styles/main.css";

const Main = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState("");
  const [curArticle, setCurArticle] = useState("");
  const [change, setChange] = useState(false);

  // 렌더링할때 api 요청으로 state에 모든 유저의 게시물 저장
  useEffect(() => {
    getArticles(setArticles);
    getTags(setTags);
  }, []);

  const onClickSendCommentHandler = () => {
    createComent(comment, curArticle, setComment, setCurArticle);
    getArticles(setArticles);
    setComment("");
    setChange((cur) => !cur);
  };

  return (
    <div>
      <div>
        <h1>게시글 리스트</h1>
        {articles.map((article) => {
          return (
            <div className="main" key={article.id}>
              <img src={`http://localhost:8000${article.image}`} alt="이미지" />
              <div
                onClick={() =>
                  onClickUserNicknameHandler(
                    article.user,
                    navigate,
                    article.nickname
                  )
                }
              >
                {article.nickname}
              </div>
              <div>title: {article.title}</div>
              <div>tag: {article.tag}</div>
              <div>content: {article.content}</div>
              <div>created: {article.created_at}</div>
              <input
                type="text"
                placeholder="댓글을 입력하세요"
                // value={comment}
                onChange={(e) => {
                  console.log("현재 게시물 번호?: ", article.id);
                  setComment(e.target.value);
                  setCurArticle(article.id);
                }}
              />
              {article.comments.length === 0 ? (
                <div>첫 댓글을 달아주세요</div>
              ) : (
                <div>
                  {article.comments.map(({ comment, id }) => {
                    return <div key={id}>{comment}</div>;
                  })}
                  {console.log("article.comments: ", article.comments[0])}
                </div>
              )}
              <button onClick={onClickSendCommentHandler}>댓글 작성하기</button>
            </div>
          );
        })}
      </div>
      <div>
        <h1>태그들 리스트</h1>
        {tags.map((tag, idx) => {
          return (
            <div className="main" key={idx}>
              {tag[idx + 1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
