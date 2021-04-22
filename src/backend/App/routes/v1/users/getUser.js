const { Router } = require("express");
const passport = require("passport");
const { getUserbyId } = require("@appModels/users");

exports.default = Router({ mergeParams: true }).get(
  "/v1/users/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.body);
      // res.json({
      //     id: req.user.id,
      //     name: req.user.name,
      //     email: req.user.email
      //   });
      return res.send(req.body);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
