const serverless = require("serverless-http");
const server = require("./app");

const { PORT } = process.env;
const port = parseInt(PORT, 10) || 4008;

server.listen(port, () => `App started listening at ${port}`);

exports.handler = serverless(server);
