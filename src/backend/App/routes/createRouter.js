const glob = require("glob");
const { Router } = require("express");

const createRouter = () => {
  console.log("Prueba1");
  const routes = glob
    .sync("**/*.js", { cwd: `${__dirname}/` })
    .map((filename) => require(`./${filename}`).default)
    .filter((router) => router && Object.getPrototypeOf(router) == Router)
    .reduce(
      (rootRouter, router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
    console.log("prueba2: ",routes)
  return routes;
};

exports.default = createRouter();
