const { Router } = require("express");
const passport = require("passport");
const { putEventService } = require("@appServices/events");

exports.default = Router({ mergeParams: true }).put(
  "/v1/events/:projectId/:eventId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await putEventService(req.params.projectId, req.params.eventId,
        req.user.pk, req.body);
      return res.send(messageResult);
    } catch (error) {
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);