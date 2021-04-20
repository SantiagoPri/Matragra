const { Router } = require("express");
const passport = require("@appConfig/passport");

exports.default = Router({ mergeParams: true }).get(
  "/v1/users/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      console.log(req);
      // res.json({
      //     id: req.user.id,
      //     name: req.user.name,
      //     email: req.user.email
      //   });
      return res.send(req);
    } catch (error) {
      next(error);
      console.warn(error);
      return "An error happened";
    }
  }
);
