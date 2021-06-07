const { Router } = require("express");
const passport = require("passport");
const { getAllProjectsByUser } = require("@appServices/projects");

exports.default = Router({ mergeParams: true }).get(
  "/v1/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await getAllProjectsByUser(req.user.pk);
      return res.send(result);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
