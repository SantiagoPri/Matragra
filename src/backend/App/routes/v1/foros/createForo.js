const { Router } = require("express");
const passport = require("passport");
const { createForoService } = require("@appServices/foros");

exports.default = Router({ mergeParams: true }).post(
  "/v1/foros",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await createForoService(req.body, req.user.pk);
      if (messageResult.status != "ok") {
        return res.send(messageResult);
      }
      return res.send(messageResult);
    } catch (error) {
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);
