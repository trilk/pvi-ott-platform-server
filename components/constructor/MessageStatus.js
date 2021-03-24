exports.MessageStatus = class MessageStatus {
  constructor() {
    let self = this;
    this.getMessageId = function () {
      return self.MessageId;
    };
    this.setMessageId = function (MessageId) {
      self.MessageId = MessageId;
    };
    this.getMessageByTime = function () {
      return self.MessageByTime;
    };
    this.setMessageByTime = function (MessageByTime) {
      self.MessageByTime = MessageByTime;
    };
    this.getContent = function () {
      return self.Content;
    };
    this.setContent = function (Content) {
      self.Content = Content;
    };
    this.getProfile = function () {
      return self.Profile;
    };
    this.setProfile = function (Profile) {
      self.Profile = Profile;
    };
    this.getCreateBy = function () {
      return self.CreateBy;
    };
    this.setCreateBy = function (CreateBy) {
      self.CreateBy = CreateBy;
    };
    this.getStatus = function () {
      return self.Status;
    };
    this.setStatus = function (Status) {
      self.Status = Status;
    };
    this.getChannelType = function () {
      return self.ChannelType;
    };
    this.setChannelType = function (ChannelType) {
      self.ChannelType = ChannelType;
    };
  }
};
