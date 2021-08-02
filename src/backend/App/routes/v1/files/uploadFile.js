const { Router } = require("express");
const passport = require("passport");
const { generateFileUrlService } = require("@appServices/files");

exports.default = Router({ mergeParams: true }).post(
  "/v1/file",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await generateFileUrlService(req.body, req.user.pk);
      return res.send(messageResult);
    } catch (error) {
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);