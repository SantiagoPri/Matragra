const { Router } = require("express");
const passport = require("passport");
const { getUserbyId } = require("@appModels/users");

exports.default = Router({ mergeParams: true }).get(
  "/v1/users/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const resJson= {
          userName: req.user.pk,
          email: req.user.sk,
          role: req.user.roleName
        };
      return res.send(resJson);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
