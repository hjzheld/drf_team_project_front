import React from "react";

import "../styles/dDay.css";

const Countdown = () => {
  const dDay = new Date("2023-12-29");
  const todayTime = new Date();
  const diff = dDay - todayTime;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="CD">
      <div className="year">2024년</div>
      <div className="dDay">D - {diffDay}일</div>
    </div>
  );
};

export default Countdown;
