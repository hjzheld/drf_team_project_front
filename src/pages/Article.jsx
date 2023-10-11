import React, { useEffect, useState } from "react";

// api
import { createArticle } from "../js/api/createArticle";
import { useNavigate } from "react-router-dom";

// api
import { getTags } from "../js/api/getTags";

const Article = () => {
  console.log("Article 컴포넌트 마운트");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagNumber, setTagNumber] = useState("");
  const [picture, setPicture] = useState([]);
  const [tags, setTags] = useState([]);

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
    console.log(picture);
  };

  // 선택한 태그의 텍스트와 매칭되는 번호를 출력하는 함수
  const getTagNumber = (targetTag, tags) => {
    for (let i = 1; i <= tags.length; i++) {
      // console.log("tags[i - 1][i]: ", tags[i - 1][i]);
      // console.log("targetTag: ", targetTag);
      if (tags[i - 1][i] === targetTag) {
        return i;
      }
      // console.log(tags[i - 1][i] === targetTag);
    }
  };

  const onClickTagHandler = (e) => {
    setTagText(e.target.innerText);
    // getTagNumber(e.target.innerText, tags);
    setTagNumber(getTagNumber(e.target.innerText, tags));
  };

  useEffect(() => {
    getTags(setTags);
  }, []);

  return (
    <>
      <div>
        <h1>태그들 리스트</h1>
        {tags.map((tag, idx) => {
          return (
            <div onClick={onClickTagHandler} key={idx}>
              {tag[idx + 1]}
            </div>
          );
        })}
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
              onChange={(e) => setTagText(e.target.value)}
              value={tagText}
              disabled
            />
            <textarea
              type="text"
              placeholder="올해 목표를 위한 다짐을 적어보세요!"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
            <input
              type="file"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
            />
            <button type="submit">목표 등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Article;
