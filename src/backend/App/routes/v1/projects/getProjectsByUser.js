const { Router } = require("express");
const passport = require("passport");
const { getProjectPksServiceByUser } = require("@appServices/projectUsers");

exports.default = Router({ mergeParams: true }).get(
  "/v1/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const resJson= await getProjectPksServiceByUser(req.user.pk);
      return res.send(resJson);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
