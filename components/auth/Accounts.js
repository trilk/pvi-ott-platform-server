// jwt
const jwt = require("jsonwebtoken");

const Accounts = require("../../model/Accounts");
const AccountType = require("../../model/AccountType");
const tokenClass = require("../constructor/Token");

function parseToken(data) {
  var token = new tokenClass.Token();
  token.setId(data.AccountTypeCode);
  token.setCustomerCode(data.CustomerCode);
  token.setRole(data.AccountTypeName);
  token.setCreateDate(Date.now());
  return token;
}

exports.login = async function (phone, password) {
  const account = await Accounts.where("PhoneNumber", phone).where(
    "Password",
    password
  );
  const result = new Object();
  if (account.length > 0) {
    // check phone and password oke login success
    result.message = "Login Success";
    // add account type to result
    const accountType = await AccountType.where(
      "AccountTypeCode",
      account[0]._id
    );

    if (typeof accountType !== "undefined" && accountType.length > 0) {
      // neu account type da ton tai thi add vao result con ko co thi khoi add
      // tao token cho result de request kiem tra token co gia tri la gi
      //create and assign a token
      try {
        const token = await jwt.sign(
          {data:parseToken(accountType[0])},
          process.env.SECRET_KEY,{expiresIn:'30m'}
        );
        result.token = token;
      } catch (error) {
        console.log(error);
      }
    }

    return result;
  } else {
    return { message: "Phone or Password invalid !!!" };
  }
};

exports.register = async function (account) {
  const result = new Accounts({
    PhoneNumber: account.phoneNumber,
    Password: account.password,
    CustomerCode: account.customerCode,
  });
  try {
    const saveAccount = await result.save();

    // save account type
    const accountType = new AccountType({
      AccountTypeCode: saveAccount._id,
      AccountTypeName: account.role,
      CustomerCode: account.customerCode,
    });
    const saveAccountType = await accountType.save();

    // add save object account type to account
    saveAccount.type = saveAccountType;
    return saveAccount;
  } catch (error) {
    return error;
  }
};
