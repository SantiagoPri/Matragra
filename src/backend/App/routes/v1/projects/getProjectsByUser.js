const { Router } = require("express");
const passport = require("passport");
const { getActiveProjectsFiteredByUserService, getProjectsByUserService} = require("@appServices/projects");


exports.default = Router({ mergeParams: true }).get(
  "/v1/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userProjectNames = await getProjectsByUserService(req.user.pk);
      const projects = await getActiveProjectsFiteredByUserService(req.user.pk);
      const resJson = {userProjectNames: userProjectNames, OtherProjects: projects}
      return res.send(resJson);
    } catch (error) {
      console.warn(error);
      return res.send(error.message);
    }
  }
);
