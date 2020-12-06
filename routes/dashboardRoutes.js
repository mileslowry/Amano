const router = require("express").Router(),
    dashboardController= require("../controllers/dashboardController");
   

router.get("/", dashboardController.indexCustomer, dashboardController.indexCustomerView);
router.get("/:custId/:poolId", dashboardController.getCustomer, dashboardController.getPool, dashboardController.show);

module.exports = router;