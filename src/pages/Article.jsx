import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// api
import { createArticle } from "../js/api/createArticle";
import { useNavigate } from "react-router-dom";

const Article = () => {
  console.log("Article 컴포넌트 마운트");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const navigate = useNavigate();

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [tag, setTag] = useState("");

  // const onClickSendArticleHandler = (e) => {
  //   e.preventDefault();
  //   createArticle(title, content, tag, navigate, setTitle, setContent);
  // };

  return (
    <>
      <div>
        <form
          // onSubmit={onClickSendArticleHandler}
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              // onChange={(e) => setTitle(e.target.value)}
              // value={title}
              id="title"
              {...register("title", {
                required: "제목을 입력하세요!!",
              })}
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && <span>{errors.title.message}</span>}
            <input
              type="text"
              placeholder="태그/카테고리"
              // onChange={(e) => setTag(e.target.value)}
              // value={tag}
              id="tag"
              {...register("tag", {
                required: "태그를 입력하세요!!",
              })}
              aria-invalid={errors.tag ? "true" : "false"}
            />
            {errors.tag && <span>{errors.tag.message}</span>}
            <textarea
              type="text"
              placeholder="올해 목표를 위한 다짐을 적어보세요!"
              // onChange={(e) => setContent(e.target.value)}
              // value={content}
              id="content"
              {...register("content", {
                required: "내용을 입력하세요!!",
              })}
              aria-invalid={errors.content ? "true" : "false"}
            />
            {errors.content && <span>{errors.content.message}</span>}
            <button type="submit" disabled={isSubmitting}>
              목표 등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Article;
