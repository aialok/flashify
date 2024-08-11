const router = require("express").Router();
const viApiRoutes = require("./v1/index.js");

/**
 * @description  Root endpoint for the API
 */

router.use("/v1", viApiRoutes);
module.exports = router;
