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
      if (messageResult.status != "ok"){
        return res.send(messageResult);
      }
      const messageResult2 = await createProjectUserService(req.body.projectName, req.user.pk)
      if (messageResult2.status != "ok") {
        return res.send(messageResult2);
      }
      return res.send(messageResult);
    } catch (error) {
      return res.send("Ha ocurrido un error");
    }
  }
);