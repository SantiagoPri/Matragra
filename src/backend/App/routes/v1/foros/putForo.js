const { Router } = require("express");
const passport = require("passport");
const { putForoService } = require("@appServices/foros");

exports.default = Router({ mergeParams: true }).put(
  "/v1/foros/:projectId/:foroId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messageResult = await putForoService(req.params.projectId, req.params.foroId, req.user.pk, req.body);
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
