const { Router } = require("express");
const passport = require("passport");
const { putProjectDetailService } = require("@appServices/projectDetails");

exports.default = Router({ mergeParams: true }).put(
  "/v1/projectDetail/:projectId/:phase",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await putProjectDetailService(req.params.projectId, req.user.pk, req.params.phase, req.body);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
