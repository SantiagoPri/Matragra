const { Router } = require("express");
const passport = require("passport");
const { getEventsByProject } = require("@appServices/events");

exports.default = Router({ mergeParams: true }).get(
  "/v1/events:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getEventsByProject(req.params.projectId, req.user.pk);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
