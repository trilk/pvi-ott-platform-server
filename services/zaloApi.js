const axios = require("axios").default;
axios.defaults.headers.post["Content-Type"] = "application/json";
const getProfileUser = async (token, user_id) => {
  return await axios.get(
    `https://openapi.zalo.me/v2.0/oa/getprofile?access_token=${token}&data={"user_id":${user_id}}`
  );
};
const zaloApiPost = async (url, data) => {
  return axios.post(url, data);
};

module.exports = {
  getProfileUser,
  zaloApiPost,
};
