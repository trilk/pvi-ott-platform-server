const viberMessageText = (userProfile, message) => {
  const viberMessage = new Object({
    receiver: userProfile.id,
    min_api_version: 1,
    sender: {
      name: userProfile.name,
      avatar: userProfile.avatar,
    },
    tracking_data: "tracking data",
    type: "text",
    text: message,
  });
  return viberMessage;
};

module.exports = {
  viberMessageText,
};
