exports.Segment = class Segment {
  constructor() {
    let self = this;
    this.getSegmentName = function () {
      return self.segmentName;
    };
    this.setSegmentName = function (segmentName) {
      this.segmentName = segmentName;
    };
    this.getSegmentDesc = function () {
      return self.segmentDesc;
    };
    this.setSegmentDesc = function (segmentDesc) {
      this.segmentDesc = segmentDesc;
    };
    this.getCustomerCode = function () {
      return self.customerCode;
    };
    this.setCustomerCode = function (customerCode) {
      this.customerCode = customerCode;
    };
  }
};
