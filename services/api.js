const axios = require("axios");
axios.defaults.headers.common["X-Viber-Auth-Token"] = process.env.VIBER_BOT_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
const viberApiPost = async (url, data) => {
  return await axios.post(url, data);
};

module.exports = {
  viberApiPost,
};
