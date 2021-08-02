const { Router } = require("express");
const passport = require("passport");
const { getListByIdService } = require("@appServices/forosList");

exports.default = Router({ mergeParams: true }).get(
  "/v1/foros/:projectId/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getListByIdService(
        req.params.projectId,
        req.user.pk
      );
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
