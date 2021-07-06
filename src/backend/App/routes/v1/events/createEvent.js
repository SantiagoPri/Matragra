const { Router } = require("express");
const passport = require("passport");
const { createEventService } = require("@appServices/events");

exports.default = Router({ mergeParams: true }).post(
  "/v1/events",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await createEventService(req.body);
      if (messageResult.status != "ok"){
        return res.send(messageResult);
      }
      return res.send(messageResult);
    } catch (error) {
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);