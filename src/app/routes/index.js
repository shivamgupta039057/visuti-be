const { apiV1Prefix } = require("../../config/default.json");

module.exports = (app) => {
  // app.use(`${apiV1Prefix}/auth`, require("./authRoutes"));
  // app.use(`${apiV1Prefix}/banner`, require("./bannerRoute"));
  // app.use(`${apiV1Prefix}/neet`, require("./neetRoutes"));
  // app.use(`${apiV1Prefix}/abroad`, require("./abroadRoutes"));
  app.use(`${apiV1Prefix}/lead`, require("./leadRoutes"));
  app.use(`${apiV1Prefix}/leadfield`, require("./leadFieldRoutes"));
  app.use(`${apiV1Prefix}/leadstage`, require("./leadStages"));
   app.use(`${apiV1Prefix}/user`, require("../routes/userRoute"));
  app.use(`${apiV1Prefix}/role`, require("../routes/roleRoute"));
  app.use(`${apiV1Prefix}/permission`, require("../routes/permissionRoute"));
};
 

