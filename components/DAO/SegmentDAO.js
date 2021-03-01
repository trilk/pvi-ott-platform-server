const Segments = require("../../model/Segments");
const Accounts = require("../../model/Accounts");
const Contacts = require("../../model/Contacts");
//lodash
const _ = require("lodash");
const listContact = [
  { chatId: "01234" },
  { chatId: "012345" },
  { chatId: "012346" },
  { chatId: "012347" },
  { chatId: "012348" },
];
exports.createSegment = async function (data, id) {
  const account = await Accounts.findById(id);
  if (!_.isEmpty(account)) {
    const customerCode = account.CustomerCode;
    const contactList = await Contacts.where("CustomerCode", customerCode);
    // get contact list
    // chỗ này sẽ filter query để lọc lại danh sách contact

    // end filter query
    // ghi db
    const result = new Segments({
      SegmentName: data.segmentName,
      SegmentDesc: data.segmentDesc,
      ChannelType: data.channelType,
      CustomerCode: customerCode,
      ChatIdList: listContact,
      CreateBy: id,
    });
    const saveSegment = await result.save();
    return saveSegment;
  }
};
