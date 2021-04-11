import glob from "glob";
import { Router } from "express";

const createRouter = () => {
  const routes = glob
    .sync("**/*.js", { cwd: `${__dirname}/` })
    .map((filename) => require(`./${filename}`).default)
    .filter((router) => router && Object.getPrototypeOf(router) == Router)
    .reduce(
      (rootRouter, router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
  return routes;
};

module.exports = createRouter;
