// jwt
const jwt = require("jsonwebtoken");
//loadash
const _ = require("lodash");
// response define
const { __exception, __emptyData, __validField, __success } = require("../../define_response");

const Accounts = require("../../model/Accounts");
const AccountType = require("../../model/AccountType");
const TokenClass = require("../constructor/Token");

function parseToken(data) {
  var token = new TokenClass.Token();
  token.setId(data._id);
  token.setCustomerCode(data.CustomerCode);
  token.setRole(data.AccountType);
  token.setName(data.FullName);
  token.setCreateDate(Date.now());
  return token;
}

exports.login = async function (phone, password) {
  const account = await Accounts.where("PhoneNumber", phone).where("Password", password);

  try {
    if (!_.isEmpty(account) && !_.isNil(account)) {
      const response = __success();
      // neu account type da ton tai thi add vao result con ko co thi khoi add
      // tao token cho result de request kiem tra token co gia tri la gi
      //create and assign a token
      try {
        const token = await jwt.sign({ data: parseToken(account[0]) }, process.env.SECRET_KEY, {
          expiresIn: "30m",
        });
        response.token = token;
      } catch (error) {
        console.log("auth login error", error);
      }
      return response;
    } else {
      return __validField();
    }
  } catch (error) {
    return __exception();
  }
};

exports.register = async function (account) {
  try {
    const accountType = await AccountType.find();
    if (
      _.isEmpty(account.phoneNumber) ||
      _.isEmpty(account.password) ||
      _.isEmpty(account.customerCode) ||
      _.isEmpty(account.accountType) ||
      _.isEmpty(account.accountName)
    ) {
      return __validField();
    } else {
      let accountTypeName = "";
      accountType.forEach((e) => {
        if (e._id.toString() === account.accountType.toString()) {
          accountTypeName = e.AccountTypeName;
        }
      });
      const result = new Accounts({
        PhoneNumber: account.phoneNumber,
        Password: account.password,
        CustomerCode: account.customerCode,
        AccountType: accountTypeName,
      });

      await result.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};
