/* @flow */
import path from "path";
import glob from "glob";
import { each, isFunction } from "lodash";
import { httpServer } from "distraught";

const IS_DEV = process.env.NODE_ENV === "development";

// app.use(express.static(path.join(__dirname, 'public')));
// replace with env var
const viewPath = path.join(`${IS_DEV ? "" : "dist/"}server/web/views`);

const server = httpServer({
  publicPath: path.join(__dirname, "public"),
  viewPath,
  viewEngine: !IS_DEV ? "js" : null,
});

if (!IS_DEV) {
  server.app.engine("js", (filePath, options, callback) => {
    // define the template engine
    // $FlowIgnore
    const data = require(filePath)(options); // eslint-disable-line
    callback(null, data);
  });
}

server.app.locals.basedir = server.app.get("views");

glob("server/web/controllers/*.js", (err, files) => {
  each(files, (file) => {
    // this can be removed once everything is converted to exporting routes
    // $FlowIgnore
    const controller = require(file); // eslint-disable-line
    if (isFunction(controller.routes)) {
      controller.routes(server);
    }
  });
});

server.start();
