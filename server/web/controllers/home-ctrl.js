// @flow
import Distraught from "distraught";

import type { Req, Res, WebServer } from "flow/types";

export function routes(server: WebServer) {
  server.app.get(
    "/",
    Distraught.w(async (req: Req, res: Res) => {
      return res.render("index");
    })
  );
}
