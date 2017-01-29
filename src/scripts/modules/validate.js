const validate = {};

// Validate an email string for a single @
validate.email = (emailAddress) => {
  if (typeof emailAddress !== 'string') {
    return false;
  }
  return (emailAddress.match(/@/g) || []).length === 1;
};

// Validate a password string for not being empty
validate.password = (textValue, minLength = 1) => {
  if (typeof textValue !== 'string') {
    return false;
  }
  return textValue.length > minLength;
};

// Validate multiple elements
validate.multiple = (elements) => {
  let result = true;
  elements.forEach((element) => {
    if (typeof validate[element.validationType] !== 'function') {
      throw new Error(`Validation ${element.validationType} does not exist.`);
    }
    if (!validate[element.validationType](element.value, element.minLength)) {
      result = false;
    }
  });
  return result;
};


export default validate;
