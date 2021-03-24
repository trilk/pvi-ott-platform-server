const zaloMessageText = (userProfile, message) => {
  const zaloMessage = new Object({
    recipient: {
      user_id: userProfile.user_id,
    },
    message: {
      text: message,
    },
  });
  return zaloMessage;
};

module.exports = {
  zaloMessageText,
};
