const { Router } = require("express");
const passport = require("passport");
const { putProjectService } = require("@appServices/projects");

exports.default = Router({ mergeParams: true }).put(
  "/v1/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await putProjectService(req.params.projectId, req.user.pk, req.body)
      return res.send(messageResult);
    } catch (error) {
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);