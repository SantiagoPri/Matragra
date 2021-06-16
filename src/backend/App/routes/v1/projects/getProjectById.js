const { Router } = require("express");
const passport = require("passport");
const { getProjectByIdService } = require("@appServices/projects");

exports.default = Router({ mergeParams: true }).get(
  "/v1/project/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getProjectByIdService(req.params.projectId);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
