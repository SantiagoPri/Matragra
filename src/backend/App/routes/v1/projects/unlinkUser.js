const { Router } = require("express");
const passport = require("passport");
const { deleteProjectUserServiceByProjectUser } = require("@appServices/projectUsers");


exports.default = Router({ mergeParams: true }).post(
  "/v1/projects/unlinkUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const {projectName, userName} = req.body
    try {
      const messageResult = await deleteProjectUserServiceByProjectUser(projectName, userName)
      return res.send(messageResult);
    } catch (error) {
      next(error);
      console.warn(error);
      return res.send("Ha ocurrido un error");
    }
  }
);
