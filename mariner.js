module.exports = {
  directory: "./migrations",

  stopOnWarning: true,

  plugins: ["sql", "js"],

  sql: {
    client: "pg",
    connection: `${process.env.DATABASE_URL}${
      process.env.NODE_ENV !== "development" ? "?ssl=true" : ""
    }`,
  },

  backend: "sql",
};
