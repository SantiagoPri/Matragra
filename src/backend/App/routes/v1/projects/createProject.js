const { Router } = require("express");
const passport = require("passport");
const { createProjectService } = require("@appServices/projects");
const { createProjectUserService } = require("@appServices/projectUsers");

exports.default = Router({ mergeParams: true }).post(
  "/v1/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await createProjectService(req.body);
      console.log("createProjectService")
      if (messageResult.status != "ok"){
        return res.send(messageResult);
      }
      const messageResult2 = await createProjectUserService(req.body.projectName, req.user.pk)
      console.log("createProjectUserService")
      return res.send(messageResult2);
    } catch (error) {
      next(error);
      console.warn(error);
      return res.send("An error happened");
    }
  }
);