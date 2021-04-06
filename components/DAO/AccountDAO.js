//loadash
const _ = require("lodash");
// response define
const { __exception, __emptyData, __validField, __success } = require("../../define_response");

const Accounts = require("../../model/Accounts");

const ProfileClass = require("../constructor/Profile");

function parseProfile(data) {
  var profile = new ProfileClass.Profile();
  profile.setPhoneNumber(data.phoneNumber);
  profile.setAddress(data.address);
  profile.setFullName(data.fullName);
  profile.setGender(data.gender);
  return profile;
}

//get profile
exports.getProfile = async function (id) {
  try {
    const result = await Accounts.findById(id);
    if (_.isEmpty(id) || _.isNil(id)) {
      return __validField();
    }
    if (_.isEmpty(result)) {
      return __emptyData();
    } else {
      const profile = new Object(__success());
      profile.profile = parseProfile(result);
      return profile;
    }
  } catch (error) {
    return __exception();
  }
};

// update profile
exports.updateProfile = async function (id, data) {
  try {
    const result = await Accounts.findById(id);
    if (_.isEmpty(id) || _.isNil(id) || _.isEmpty(data) || _.isNil(data)) {
      return __validField();
    }
    if (_.isEmpty(result)) {
      return __emptyData();
    } else {
      let account = new Object();
      account.FullName = data.fullName;
      account.Address = data.address;
      account.Gender = data.gender;

      await Accounts.updateOne({ _id: id }, { $set: account });
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

// delete account
exports.deleteAccount = async function (id) {
  try {
    const result = await Accounts.findById(id);
    if (_.isEmpty(id) || _.isNil(id)) {
      return __validField();
    }
    if (_.isEmpty(result)) {
      return __emptyData();
    } else {
      await Accounts.deleteOne({ _id: id });
      return __success();
    }
  } catch (error) {
    return __exception();
  }
};

//list all account
exports.listAccount = async function (page, limit) {
  try {
    const list = await Accounts.find()
      .sort({ _id: -1 })
      .skip(limit * page - limit)
      .limit(limit);
    const totalRecord = await Accounts.find();
    let listAccounts = new Object();
    listAccounts.Accounts = list;
    listAccounts.total = totalRecord.length;
    return listAccounts;
  } catch (error) {
    return __exception();
  }
};
