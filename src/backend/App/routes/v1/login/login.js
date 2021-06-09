const { Router } = require("express");
const { loginService } = require("@appServices/login");

exports.default = Router({ mergeParams: true }).post(
  "/v1/login",
  async (req, res, next) => {
    try {
      const jwt = await loginService(req.body);
      return res.send(jwt);
    } catch (error) {
      next(error);
      console.warn(error);
      return "Ha ocurrido un error";
    }
  }
);
