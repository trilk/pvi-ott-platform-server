exports.Token = class Token {
  constructor() {
    let self = this;
    this.getId = function () {
      return self.id;
    };

    this.setId = function (id) {
      self.id = id;
    };

    this.getRole = function () {
      return self.role;
    };
    this.setRole = function (role) {
      self.role = role;
    };
    this.getCustomerCode = function () {
      return self.customerCode;
    };
    this.setCustomerCode = function (customerCode) {
      self.customerCode = customerCode;
    };
    this.getCreateDate = function () {
      return self.createDate;
    };
    this.setCreateDate = function (date) {
      self.createDate = date;
    };
  }
};
