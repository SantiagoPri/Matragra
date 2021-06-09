const { Router } = require("express");
const passport = require("passport");
const { getProjectByIdService } = require("@appServices/projects");

exports.default = Router({ mergeParams: true }).get(
  "/v1/project",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getProjectByIdService(req.body.projectName);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
