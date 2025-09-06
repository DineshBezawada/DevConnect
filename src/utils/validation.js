const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please Enter FirstName and LastName");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is Invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Pls Enter Strong Password");
  }
};

const validateProfile = (req) =>{
   const isAllowedFields = ["firstName", "lastName", "age", "gender", "skills", "about"]
   const isValid = Object.keys(req?.body).every(field => isAllowedFields.includes(field));
  return isValid
}

module.exports = { validateSignUp, validateProfile };
