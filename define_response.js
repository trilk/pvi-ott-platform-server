const __success = () => {
  return {
    errorCode: 0,
    message: "Success",
  };
};

const __validField = () => {
  return {
    errorCode: -101,
    message: "Field Invalid",
  };
};

const __emptyData = () => {
  return {
    errorCode: -102,
    message: "Data is Empty",
  };
};

const __accessDenied = () => {
  return {
    errorCode: -103,
    message: "Access Denied",
  };
};

const __invalidToken = () => {
  return {
    errorCode: -104,
    message: "Token Invalid",
  };
};

const __exception = () => {
  return {
    errorCode: -202,
    message: "Somthing went wrong",
  };
};

const __network = () => {
  return {
    errorCode: -301,
    message: "Network error",
  };
};

const __permission = () => {
  return {
    errorCode: -105,
    message: "Permission error",
  };
};

const __exist = () => {
  return {
    errorCode: 1,
    message: "Exist Value",
  };
};

const __missingParam = () => {
  return {
    errorCode: -106,
    message: "Missing Parameter",
  }
}
module.exports = {
  __success,
  __validField,
  __emptyData,
  __accessDenied,
  __invalidToken,
  __exception,
  __network,
  __permission,
  __exist,
  __missingParam
};
