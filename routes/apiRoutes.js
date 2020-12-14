const router = require("express").Router(),
    // apiController= require("../controllers/apiController"),
    dashboardController = require("../controllers/dashboardController");

router.get("/dashboard/:custId/:poolId", dashboardController.getPool, dashboardController.respondJSON);

module.exports = router;