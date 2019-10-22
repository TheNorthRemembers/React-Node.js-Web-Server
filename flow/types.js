// @flow

export type WebServer = $ReadOnly<{
  app: {
    get: (string | Array<string>, ...any) => void,
    post: (string | Array<string>, ...any) => void,
    put: (string | Array<string>, ...any) => void,
    delete: (string | Array<string>, ...any) => void,
    all: (string | Array<string>, ...any) => void,
  },
  passport: {
    authenticate: (string, ?Object) => Function,
  },
}>;

export type Req = {|
  body: Object,
  query: Object,
  path: string,
  method: string,
  params: Object,
  protocol: string,
  headers: Object,
  originalUrl: string,
  url: string, // relative path including querystring
  validationErrors: () => Array<Object>,
  assert: (
    string,
    string
  ) => {
    isInt: Function,
    isEmail: Function,
    equals: Function,
    len: Function,
  },
  sanitize: (string) => Object,
  isAuthenticated: () => boolean,
  flash: (
    "success" | "info" | "error" | "warning",
    Array<string> | string
  ) => void,
  session: Object,
  connection: Object,
  logout: Function,
  logIn: Function,
|}; // Not readonly

export type Res = $ReadOnly<{
  send: (any) => Res,
  json: (any) => Res,
  status: (number) => Res,
  render: (string, ?Object) => void,
  locals: Object,
  redirect: (string) => void,
  type: (any) => Res,
  set: (string, string) => void,
  sendStatus: (number) => void,
  format: (Object) => void,
}>;
