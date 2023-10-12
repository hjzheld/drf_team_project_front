import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// js api
import { getUserInfoData } from "../js/api/GET/getUserInfo";
import { profileUpdate } from "../js/api/UPDATE/updateProfile";

// 디자인
import "../styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faM,
  faBlog,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

const ProfileUpdate = () => {
  const imageInputRef = useRef();

  const [onClickBtn, setOnclickBtn] = useState(false);
  const [sendBtn, setSendBtn] = useState("저장");
  const [cancelBtn, setCancel] = useState("수정");

  // 수정 인풋값들과 연결되는 훅
  const [inputEmail, setInputEmail] = useState("");
  const [inputProfile, setInputProfile] = useState([]);
  const [inputNickname, setInputNickname] = useState("");
  const [inputMbti, setInputMbti] = useState("");
  const [inputBlog, setInputBlog] = useState("");

  // 개인 유저의 정보를 담을 훅
  const [userInfo, setUserInfo] = useState({});
  // url에서 값을 받아오기 위한 hook
  const params = useParams();
  // 유저 프로필 조회
  useEffect(() => {
    getUserInfoData(params.id, setUserInfo);
  }, []);

  const onCickImageUploadHandler = () => {
    imageInputRef.current?.click();
  };

  // 훅에 담은 유저 정보
  const {
    email,
    nickname,
    blog = "없음",
    comments,
    article_set,
    followers,
    follwings,
    like_articles,
    mbti = "없음",
    profile,
  } = userInfo;

  const onClickProfileEditSaveBtnHandler = () => {
    profileUpdate(
      inputNickname,
      inputEmail,
      inputMbti,
      inputBlog,
      inputProfile,
      params.id,
      setUserInfo
    );
    setOnclickBtn((cur) => !cur);
  };

  const onClickProfileEditCancelBtnHandler = () => {
    setOnclickBtn((cur) => !cur);
  };

  const onClickCancelBtnHandler = () => {
    setOnclickBtn((cur) => !cur);
  };

  return (
    <div className="profile-wrap">
      {onClickBtn ? (
        <div className="update-wrap">
          <div>
            <button
              className="profile-img"
              onClick={() => {
                onCickImageUploadHandler();
              }}
            >
              {inputProfile.length === 0 ? "프로필 이미지" : inputProfile.name}
            </button>
            <input
              // input의 ref 속성을 이용해 버튼 클릭 이벤트를 input과 연결
              className="article_input-file"
              ref={imageInputRef}
              type="file"
              onChange={(e) => setInputProfile(e.target.files[0])}
              required
            />
          </div>
          <div>
            <div>
              <input
                className="update_nickname"
                type="text"
                onChange={(e) => setInputNickname(e.target.value)}
                value={inputNickname}
                placeholder={nickname}
              />
            </div>
            <div className="update_lists">
              <input
                type="text"
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
                placeholder={email}
              />
              <input
                type="text"
                onChange={(e) => setInputBlog(e.target.value)}
                value={inputBlog}
                placeholder={blog}
              />
              <input
                type="text"
                onChange={(e) => setInputMbti(e.target.value)}
                value={inputMbti}
                placeholder={mbti}
              />
            </div>
          </div>
        </div>
      ) : (
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
        </div>
      )}
      {onClickBtn ? (
        <button
          className="updateBtn"
          onClick={onClickProfileEditSaveBtnHandler}
        >
          {sendBtn}
        </button>
      ) : (
        <button
          className="updateCancleBtn"
          onClick={onClickProfileEditCancelBtnHandler}
        >
          {cancelBtn}
        </button>
      )}
      {onClickBtn ? (
        <button className="cancleBtn" onClick={onClickCancelBtnHandler}>
          취소
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileUpdate;
