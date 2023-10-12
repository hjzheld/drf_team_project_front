import axios from "axios";

const getUserInfoData = (userId, setUserInfo) => {
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/user/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        setUserInfo({ ...response.data });
        // return response.data;
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { getUserInfoData };
