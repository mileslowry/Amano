const router = require("express").Router(),
    dashboardController= require("../controllers/dashboardController");
   

router.get("/", dashboardController.indexCustomers);
router.get("/alerts", dashboardController.indexPools, dashboardController.indexCustomerAlerts, dashboardController.indexCustomerAlertsView);
// PART OF NEXT PHASE OF DEVELOPMENT:
// router.get("/chemicals-to-bring", dashboardController.chemicalsToBring);
router.get("/:custId/add-pool", dashboardController.getCustomer, dashboardController.addPoolView);
router.post("/:custId/add-pool", dashboardController.addPool, dashboardController.redirectView);
router.get("/:custId/:poolId", dashboardController.getCustomer, dashboardController.getPool, dashboardController.show);

module.exports = router;
 