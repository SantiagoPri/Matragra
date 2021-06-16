const { Router } = require("express");
const passport = require("passport");
const { createProjectUserService } = require("@appServices/projectUsers");


exports.default = Router({ mergeParams: true }).post(
  "/v1/projects/linkUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const {projectName, userName} = req.body
    try {
      const messageResult = await createProjectUserService(projectName, userName)
      return res.send(messageResult);
    } catch (error) {
      next(error);
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);
