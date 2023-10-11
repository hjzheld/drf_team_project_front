import React, { useEffect, useRef, useState } from "react";

import { createTag } from "../js/api/POST/createTag";
import { useNavigate } from "react-router-dom";
// api
import { getTags } from "../js/api/GET/getTags";

const Tag = () => {
  console.log("Tag 컴포넌트 마운트");
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

  return (
    <>
      <div>
        <h1>태그들 리스트</h1>
        {tags.map((tag, idx) => {
          return <div key={idx}>{tag[idx + 1]}</div>;
        })}
        <form onSubmit={onClickSendTagHandler}>
          <div>
            <input
              ref={userRef}
              type="text"
              placeholder="목표 입력하세요"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              required
            />
            {errMsg}
            <button type="submit">새로운 목표 등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Tag;
