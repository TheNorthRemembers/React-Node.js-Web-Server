// @flow

export function startWebServer() {
  console.log(`Starting web server on ${process.pid}`); // eslint-disable-line
  require("./server/web/router");
}
