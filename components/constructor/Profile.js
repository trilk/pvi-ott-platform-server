exports.Profile = class Profile {
  constructor() {
    let self = this;
    this.getFullName = function () {
      return self.fullName;
    };
    this.setFullName = function (fullName) {
      self.fullName = fullName;
    };
    this.getPhoneNumber = function () {
      return self.phoneNumber;
    };
    this.setPhoneNumber = function (phoneNumber) {
      self.phoneNumber = phoneNumber;
    };
    this.getGender = function () {
      return self.gender;
    };
    this.setGender = function (gender) {
      self.gender = gender;
    };
    this.getAddress = function () {
      return self.address;
    };
    this.setAddress = function (address) {
      self.address = address;
    };
  }
};
