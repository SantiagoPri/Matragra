const { Router } = require("express");
const { createUserService } = require("@appServices/users");

exports.default = Router({ mergeParams: true }).post(
  "/v1/users",
  async (req, res, next) => {
    try {
      const messageResult = await createUserService(req.body);
      return res.send(messageResult);
    } catch (error) {
      next(error);
      console.warn(error);
      return "Ha ocurrido un error";
    }
  }
);
