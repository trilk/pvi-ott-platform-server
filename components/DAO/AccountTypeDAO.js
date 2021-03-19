const _ = require("lodash");
const AccountType = require("../../model/AccountType");
const { __success, __exception, __emptyData, __validField } = require("../../define_response");
exports.createAccountType = async function (data) {
  try {
    if (_.isEmpty(data.accountTypeName)) {
      return __validField();
    } else {
      const accountType = new AccountType({
        AccountTypeName: data.accountTypeName,
        AccountTypeDesc: data.accountTypeDesc,
      });
      await accountType.save();
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.updateAccountType = async function (id, data) {
  try {
    const result = await AccountType.findById(id);
    if (_.isEmpty(id) || _.isNil(id)) {
      return __validField();
    }
    if (_.isEmpty(result)) {
      return __emptyData();
    } else {
      let accountType = new Object();
      accountType.AccountTypeName = data.accountTypeName;
      accountType.AccountTypeDesc = data.accountTypeDesc;
      await AccountType.updateOne({ _id: id }, { $set: accountType });
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

exports.listAccountType = async function (page, limit) {
  try {
    const list = await AccountType.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);
    const totalRecord = await AccountType.find();
    let listAccountType = new Object();
    listAccountType.AccountType = list;
    listAccountType.total = totalRecord.length;
    return listAccountType;
  } catch (error) {
    return __exception();
  }
};
