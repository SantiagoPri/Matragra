const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("@appValidations/login");
const { getUserbyId, getUserbyEmail } = require("@appModels/users");
const cleaner = require("@appHelpers/cleanResponses");
const { API_KEY } = process.env;

async function loginService(inputUser) {
  const { userName, password } = inputUser;
  const validation = await validateLoginInput(userName, password);

  if (!validation.isValid) {
    return validation.message;
  }

  let user = await getUserbyEmail(userName.toLowerCase());

  if (!user.Count) {
    user = await getUserbyId(userName.toLowerCase());
    if (!user.Count) {
      return { status: "error", message: "User or password are invalid" };
    }
  }

  [user] = cleaner(user).Items;

  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: "error", message: "Password incorrect" };
  }
  const payload = { userName: user.pk };
  //Token
  const jwtToken = await new Promise((resolve, reject) => {
    jwt.sign(payload, API_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(`Bearer ${token}`);
    });
  });
  return { status: "ok", message: jwtToken };
}

module.exports = { loginService };
