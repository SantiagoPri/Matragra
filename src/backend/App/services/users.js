const bcrypt = require("bcryptjs");
const validateNewUser = require("@appValidations/newUser");
const { insertNewUser } = require("@appModels/users");

async function createUserService(user) {
  const { userName, roleName, password, ...restParams } = user;
  const validation = await validateNewUser(userName, roleName, password);
  if (!validation.isValid) {
    return validation.message;
  }
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

  await insertNewUser(userName, roleName, {
    password: encryptedPassword,
    ...restParams,
  });
  return "User succesfully created";
}

module.exports = { createUserService };
