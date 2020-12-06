const router = require("express").Router(),
  accountRoutes = require("./accountRoutes"),
  homeRoutes = require("./homeRoutes"),
  customerRoutes = require("./customerRoutes"),
  dashboardRoutes = require("./dashboardRoutes");
  

router.use("/dashboard", dashboardRoutes);
router.use("/account", accountRoutes);
router.use("/customer", customerRoutes);
router.use("/", homeRoutes);

module.exports = router;
