const { Router } = require("express");
const passport = require("passport");
const { createProjectService } = require("@appServices/projects");
const { createProjectUserService } = require("@appServices/projectUsers");


exports.default = Router({ mergeParams: true }).post(
  "/v1/projects/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const messageResult = await createProjectService(req.body);
      if (messageResult.status != "ok"){
        return messageResult;
      }
      const messageResult2 = await createProjectUserService(req.body.projectName, req.user.pk)
      return res.send(messageResult2);
    } catch (error) {
      next(error);
      console.warn(error);
      return "An error happened";
    }
  }
);
