const bcrypt = require("bcryptjs");
const { validateNewUser } = require("@appValidations/user");
const { insertNewUser } = require("@appModels/users");

async function createUserService(user) {
  const { userName, email, roleName, password, ...restParams } = user;
  const { isValid, message } = await validateNewUser(
    userName,
    email,
    roleName,
    password
  );
  if (!isValid) {
    return { status: "error", message };
  }
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

  await insertNewUser(
    userName,
    email.toLowerCase(),
    roleName,
    encryptedPassword,
    {
      ...restParams,
    }
  );
  return { status: "ok", message: "Usuario creado exitosamente" };
}

module.exports = { createUserService };
