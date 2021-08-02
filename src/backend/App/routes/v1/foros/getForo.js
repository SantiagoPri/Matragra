const { Router } = require("express");
const passport = require("passport");
const { getForoByIdService } = require("@appServices/foros");

exports.default = Router({ mergeParams: true }).get(
  "/v1/foros/:projectId/:foroName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getForoByIdService(
        req.params.projectId,
        req.params.foroName,
        req.user.pk
      );
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
