const router = require("express").Router(),
  accountRoutes = require("./accountRoutes"),
  homeRoutes = require("./homeRoutes"),
  dashboardRoutes = require("./dashboardRoutes");
  

router.use("/dashboard", dashboardRoutes);
router.use("/account", accountRoutes);
router.use("/", homeRoutes);

module.exports = router;
