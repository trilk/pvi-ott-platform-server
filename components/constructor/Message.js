exports.Message = class Message {
  constructor() {
    let self = this;
    this.getContentOTT = function () {
      return self.contentOTT;
    };
    this.setContentOTT = function (contentOTT) {
      self.contentOTT = contentOTT;
    };
    this.getContentSMS = function () {
      return self.contentSMS;
    };
    this.setContentSMS = function (contentSMS) {
      self.contentSMS = contentSMS;
    };
    this.getSegmentId = function () {
      return self.segmentId;
    };
    this.setSegmentId = function (segmentId) {
      self.segmentId = segmentId;
    };
    this.getTemplateId = function () {
      return self.templateId;
    };
    this.setTemplateId = function (templateId) {
      self.templateId = templateId;
    };
    this.getCreateBy = function () {
      return self.createBy;
    };
    this.setCreateBy = function (createBy) {
      self.createBy = createBy;
    };
  }
};
