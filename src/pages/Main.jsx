import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// js api
import { getArticles } from "../js/api/GET/getArticles";
import { getTags } from "../js/api/GET/getTags";
import { createComent } from "../js/api/POST/createComent";
import { onClickDeleteArticle } from "../js/api/DELETE/deleteArticle";

// js
import { onClickUserNicknameHandler } from "../js/clickedUserNickname";

// 스타일
import "../styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState("");
  const [curArticle, setCurArticle] = useState("");
  const [change, setChange] = useState(false);

  // 현재 로그인한 유저의 정보
  const [curLoginUserId, setCurLoginUserId] = useState("");

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

  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload) {
      const userId = payload["user_id"];
      setCurLoginUserId(userId);
    } else {
      return;
    }
  }, []);

  return (
    <div className="main-wrap">
      <div className="main-tag_container">
        <div className="main-tag_title">올해 목표 목록</div>
        <ul className="main-tag_list">
          {tags.map((tag, idx) => {
            return (
              <li key={idx} className="main-tag_item">
                {tag[idx + 1]}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="main-article_container">
        <ul className="main-article_list">
          {articles.map((article) => {
            return (
              <li className="main-article_item" key={article.id}>
                <div className="main-article_item_tag">
                  <h2>{article.tag}</h2>
                  {article.user === curLoginUserId ? (
                    <FontAwesomeIcon
                      onClick={() =>
                        onClickDeleteArticle(article.id, articles, setArticles)
                      }
                      icon={faTrashCan}
                      className="deleteBtn"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="main-article_item_imgBox">
                  <img
                    className="main-article_item_img"
                    src={`http://localhost:8000${article.image}`}
                    alt="게시글 이미지"
                  />
                </div>
                <div className="main-article_item_nicknameAndCreated">
                  <div
                    className="main-article_item_nickname"
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

                  <div className="main-article_item_created">
                    {article.created_at}
                  </div>
                </div>
                <div className="main-article_item_titleAndContent">
                  <div className="main-article_item_title">{article.title}</div>
                  <div className="main-article_item_content">
                    {article.content}
                  </div>
                </div>
                <div className="main-article_item_commentBox">
                  {article.comments.length === 0 ? (
                    <div>첫 댓글을 달아주세요</div>
                  ) : (
                    <div>
                      {article.comments.map(({ comment, id }) => {
                        return (
                          <div className="comment-text" key={id}>
                            {comment}
                          </div>
                        );
                      })}
                      {console.log("article.comments: ", article.comments[0])}
                    </div>
                  )}
                </div>

                <div className="main-article_item_inputAndBtn">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={comment}
                    onChange={(e) => {
                      console.log("현재 게시물 번호?: ", article.id);
                      setComment(e.target.value);
                      setCurArticle(article.id);
                    }}
                  />
                  <button onClick={onClickSendCommentHandler}>작성하기</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Main;
