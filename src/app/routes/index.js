const { apiV1Prefix } = require("../../config/default.json");

module.exports = (app) => {
  // app.use(`${apiV1Prefix}/auth`, require("./authRoutes"));
  app.use(`${apiV1Prefix}/banner`, require("./bannerRoute"));
  app.use(`${apiV1Prefix}/neet`, require("./neetRoutes"));
  app.use(`${apiV1Prefix}/abroad`, require("./abroadRoutes"));

};
