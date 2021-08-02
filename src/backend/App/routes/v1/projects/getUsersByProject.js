const { Router } = require("express");
const passport = require("passport");
const { getUsersByProjectService } = require("@appServices/projectUsers");

exports.default = Router({ mergeParams: true }).get(
  "/v1/projects/users/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getUsersByProjectService(req.params.projectId, req.user.pk);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
