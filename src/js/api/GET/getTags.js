import axios from "axios";

const getTags = (setTags) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/tag/",
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        console.log("tag: ", response.data);
        setTags([...response.data]);
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err?.response) {
        console.log(err);
      }
    });
};

export { getTags };
