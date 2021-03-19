const jwt = require("jsonwebtoken");
const { __accessDenied, __invalidToken } = require("../define_response");
const _ = require("lodash");
module.exports = function verify(req, res, next) {
  const token = req.header("auth-token");
  try {
    if (_.isNil(token)) {
      return res.send(__accessDenied());
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.account = verified;
    next();
  } catch (error) {
    res.send(__invalidToken());
  }
};
