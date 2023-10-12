import React, { useEffect, useRef, useState } from "react";

import { createTag } from "../js/api/POST/createTag";
import { useNavigate } from "react-router-dom";
// api
import { getTags } from "../js/api/GET/getTags";

// 스타일
import "../styles/tag.css";

const Tag = () => {
  const userRef = useRef();

  const navigate = useNavigate();

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const onClickSendTagHandler = (e) => {
    e.preventDefault();
    createTag(tag, setTag, navigate, setErrMsg);
  };

  useEffect(() => {
    getTags(setTags);
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [tag]);

  console.log("tags:", tags);

  return (
    <>
      <div className="cleate-tag_wrap">
        <div className="tag-contaier">
          <h1>올해 모든 유저들의 목표들</h1>
          <div className="tag-list">
            {tags.map((tag, idx) => {
              return (
                <div className="tag" key={idx}>
                  {Object.values(tag)}
                </div>
              );
            })}
          </div>
        </div>
        <form className="create-tag_form" onSubmit={onClickSendTagHandler}>
          <h3>한번 등록한 목표는 삭제할 수 없어요</h3>
          <p>신중하게 목표를 정하고 끝까지 최선을 다하세요!!</p>
          {errMsg}
          <div className="form-box">
            <input
              className="tag-text"
              ref={userRef}
              type="text"
              placeholder="목표를 입력하세요"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              required
            />

            <button type="submit" className="send-tagBtn">
              새로운 목표 등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Tag;
