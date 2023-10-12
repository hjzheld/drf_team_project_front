import React, { useEffect, useState } from "react";

// js api
import { getUserArticles } from "../js/api/GET/getUserArticles";
import { useLocation, useParams } from "react-router-dom";
import { getUserInfoData } from "../js/api/GET/getUserInfo";
import { getUserAchievementRate } from "../js/api/GET/getUserRate";
import { getUserTag } from "../js/api/GET/getUserTag";
import { onClickDeleteArticle } from "../js/api/DELETE/deleteArticle";
import { deleteOnlyMyComment } from "../js/api/DELETE/deleteComment";
import { createComent } from "../js/api/POST/createComent";

// 디자인
import "../styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faM,
  faBlog,
  faCircleUser,
  faCircleXmark,
  faTrashCan,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  // url에서 값을 받아오기 위한 hook
  const params = useParams();

  // navi로 url 변경시에 데이터를 받아오기 위한 hook
  const { state } = useLocation();

  // api 요청으로 개인 유저의 게시물을 가져와서 담을 hook
  const [userArticles, setUserArticles] = useState([]);

  const [isValidUser, setIsValidUser] = useState(false);
  const [storageUserId, setStorageUserId] = useState("");
  const [storageUserNickname, setStorageUserNickname] = useState("");

  // 개인 유저의 달성률 훅
  const [userRate, setUserRate] = useState([]);

  // 개인 유저의 태그/목표 훅
  const [userTags, setUserTags] = useState([]);

  // 개인 유저의 정보를 담을 훅
  const [userInfo, setUserInfo] = useState({});

  // 댓글
  const [comment, setComment] = useState("");
  const [curArticle, setCurArticle] = useState("");
  const [change, setChange] = useState(false);
  // 현재 프로필을 보고 있는 유저가 본인 게시물을 보는지 확인하기 위해 사용
  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    const userId = payload["user_id"];
    const userNickname = payload["nickname"];
    setStorageUserNickname(userNickname);
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
  }, [params.id, change]);

  const onClickSendCommentHandler = () => {
    createComent(comment, curArticle, setComment, setCurArticle);
    getUserArticles(params.id, setUserArticles);
    setComment("");
    setChange((cur) => !cur);
  };

  // 유저 프로필 조회
  useEffect(() => {
    getUserInfoData(clickedUserId, setUserInfo);
  }, [clickedUserId]);

  // 훅에 담은 유저 정보
  const {
    email,
    nickname,
    blog = "빈값임",
    comments,
    article_set,
    followers,
    follwings,
    like_articles,
    mbti = "빈값임",
    profile,
  } = userInfo;

  useEffect(() => {
    getUserTag(clickedUserNickname, storageUserNickname, setUserTags);
  }, [storageUserNickname]);

  return (
    <div className="profile-wrap">
      <div className="profile-container">
        <div className="profile-container_first">
          <div className="profile-img">
            {profile !== "/media/uploads/profiles/default_profile.png" ? (
              <img
                className="user-info_profile"
                src={`http://localhost:8000${profile}`}
                alt="프로필 이미지"
              />
            ) : (
              <FontAwesomeIcon
                className="default-profile"
                icon={faCircleUser}
              />
            )}
          </div>
          <div className="profile-container_2">
            <div className="profile-nickname">{nickname}</div>
            <div className="profile-text">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <div>{email}</div>
            </div>
            <div className="profile-text">
              <FontAwesomeIcon icon={faBlog} className="icon" />
              {blog === "" ? <div></div> : <div>{blog}</div>}
            </div>
            <div className="profile-text">
              <FontAwesomeIcon icon={faM} className="icon" />
              {mbti === "" ? <div></div> : <div>{mbti}</div>}
            </div>
          </div>
        </div>

        <div className="rate-lists">
          {userTags.map((rate) => {
            return (
              <div key={rate.id}>
                <div className="rate-text_box">
                  <span className="rate-text">{rate.tag_name}</span>에
                  <span className="rate-text">{rate.tag_articles}</span>걸음
                  가까워 졌습니다.
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tag-contaier">
        <div className="tag-list profile-tags">
          {userTags.map((rate) => {
            return (
              <div className="tag" key={rate.id}>
                <div>{rate.tag_name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <ul className="main-article_list">
          {userArticles.map((article) => {
            {
              console.log(article);
            }
            return (
              <li className="main-article_item" key={article.id}>
                <div className="main-article_item_tag">
                  <h2>{article.tag}</h2>
                  {parseInt(params.id) === parseInt(storageUserId) ? (
                    <FontAwesomeIcon
                      onClick={() =>
                        onClickDeleteArticle(
                          article.id,
                          userArticles,
                          setUserArticles
                        )
                      }
                      icon={faCircleXmark}
                      className="deleteBtn"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="main-article_item_nicknameAndCreated">
                  <div className="userInfo-wrap">
                    <div>
                      {article.profile !==
                      "/media/uploads/profiles/default_profile.png" ? (
                        <img
                          className="user-info_profile"
                          src={`http://localhost:8000${article.profile}`}
                          alt=""
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="icon-user"
                          icon={faCircleUser}
                        />
                      )}
                    </div>
                    <div>
                      <div className="main-article_item_nickname">
                        {article.nickname}
                      </div>

                      <div className="main-article_item_created">
                        {article.created_at}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="main-article_item_imgBox">
                  <img
                    className="main-article_item_img"
                    src={`http://localhost:8000${article.image}`}
                    alt="게시글 이미지"
                  />
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
                      {article.comments.map(
                        ({ comment, id, nickname, user_id }) => {
                          return (
                            <div className="comment-text" key={id}>
                              <div className="comment-text_name">
                                {nickname}
                              </div>
                              <span className="comment-text_content">
                                <div className="comment-text_box">
                                  {comment}
                                  {user_id === storageUserId ? (
                                    <FontAwesomeIcon
                                      className="comment-delete"
                                      icon={faTrashCan}
                                      onClick={() =>
                                        deleteOnlyMyComment(article.id, id)
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                <div className="main-article_item_inputAndBtn">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      setCurArticle(article.id);
                    }}
                  />
                  <button onClick={onClickSendCommentHandler}>
                    <FontAwesomeIcon className="sendBtn" icon={faPaperPlane} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
