const { Router } = require("express");
const { loginService } = require("@appServices/login");

exports.default = Router({ mergeParams: true }).post(
  "/v1/login/",
  async (req, res, next) => {
    try {
      console.log("Logging");
      const jwt = await loginService(req.body);
      return res.send(jwt);
      console.log("Login successfully")
    } catch (error) {
      next(error);
      console.warn(error);
      return "An error happened";
    }
  }
);
