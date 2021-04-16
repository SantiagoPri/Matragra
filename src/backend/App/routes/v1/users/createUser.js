const { Router } = require("express");
const { createUserService } = require("@appServices/users");

exports.default = Router({ mergeParams: true }).post(
  "/v1/users/",
  async (req, res, next) => {
    try {
      console.log("creating a new user");
      const messageResult = await createUserService(req.body);
      console.log("Operation results: ", messageResult);
      return res.send(messageResult);
    } catch (error) {
      next(error);
      console.warn(error);
      return "An error happened";
    }
  }
);
