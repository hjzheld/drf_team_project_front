import React, { useEffect, useRef, useState } from "react";

// api
import { createArticle } from "../js/api/POST/createArticle";
import { useNavigate, useParams } from "react-router-dom";

// api
import { getTags } from "../js/api/GET/getTags";
import { getUserTag } from "../js/api/GET/getUserTag";
import { getUserAchievementRate } from "../js/api/GET/getUserRate";
import { getUserInfoData } from "../js/api/GET/getUserInfo";

const Article = () => {
  const imageInputRef = useRef();
  const navigate = useNavigate();

  const param = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagNumber, setTagNumber] = useState("");
  const [picture, setPicture] = useState([]);
  const [tags, setTags] = useState([]);
  const [userNickname, setUserNickname] = useState("");

  // 개인 유저의 정보를 저장하는 훅
  const [userInfo, setUserInfo] = useState({});

  const onCickImageUploadHandler = () => {
    imageInputRef.current?.click();
  };

  // 목표 게시글 작성하는 함수
  const onClickSendArticleHandler = (e) => {
    e.preventDefault();
    createArticle(
      title,
      content,
      tagNumber,
      picture,
      navigate,
      setTitle,
      setContent,
      setTagText,
      setPicture
    );
    console.log("tagNumber: ", tagNumber);
  };

  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload) {
      const nickname = payload["nickname"];
      setUserNickname(nickname);
    }
  }, []);

  // 선택한 태그의 텍스트와 매칭되는 번호를 출력하는 함수
  const getTagNumber = (targetTag, tags) => {
    for (let i = 0; i < tags.length; i++) {
      let test;
      if (targetTag === Object.values(tags[i])[0]) {
        test = Object.keys(tags[i]);
        return test[0];
      }
    }
  };

  const onClickTagHandler = (e) => {
    setTagText(e.target.innerText);
    setTagNumber(getTagNumber(e.target.innerText, tags));
  };

  // 개인 유저의 정보를 가져오는 훅
  useEffect(() => {
    getUserInfoData(param.id, setUserInfo);
  }, []);

  // 개인 유저의 목표 가져오기 훅
  useEffect(() => {
    console.log("훅 안에서 유저 정보 있음?: ", userInfo.nickname);
    getUserTag(userInfo.nickname, null, setTags);
  }, [userInfo]);

  console.log("tags: ", tags);

  return (
    <>
      <div className="cleate-tag_wrap">
        <div className="tag-contaier">
          <h1>올해 내 목표 리스트</h1>
          <div className="tag-list">
            {tags.map((tag, idx) => {
              return (
                <div className="tag" onClick={onClickTagHandler} key={idx}>
                  {Object.values(tag)[0]}
                </div>
              );
            })}
          </div>
        </div>
        <form className="create-tag_form" onSubmit={onClickSendArticleHandler}>
          <h3>내가 정한 목표를 위한 글을 작성할 수 있어요</h3>
          <p>목표 리스트에서 선택하세요</p>
          <div className="tag-select">
            <input
              type="text"
              placeholder=""
              onChange={(e) => setTagText(e.target.value)}
              value={tagText}
              className="target-tag"
              disabled
            />
            <div>(을)를 위한 계획 작성합니다</div>
          </div>
          <div className="article_input-form">
            <input
              className="article_input-title"
              type="text"
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />

            <textarea
              className="article_input-content"
              type="text"
              placeholder="올해 목표를 위한 다짐을 적어보세요!"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
            <button
              className="imgSel-btn"
              onClick={() => {
                onCickImageUploadHandler();
              }}
            >
              {picture.length === 0 ? "이미지 찾기" : picture.name}
            </button>
            <input
              // input의 ref 속성을 이용해 버튼 클릭 이벤트를 input과 연결
              className="article_input-file"
              ref={imageInputRef}
              type="file"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
              required
            />
            <button className="send-article_btn" type="submit">
              목표 등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Article;
