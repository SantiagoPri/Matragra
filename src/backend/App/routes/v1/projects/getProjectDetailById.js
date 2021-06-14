const { Router } = require("express");
const passport = require("passport");
const { getProjectDetailByIdService } = require("@appServices/projectDetails");

exports.default = Router({ mergeParams: true }).get(
  "/v1/projectDetail/:projectId/:phase",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getProjectDetailByIdService(req.params.projectId, req.params.phase);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
