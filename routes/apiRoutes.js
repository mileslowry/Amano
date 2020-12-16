const router = require("express").Router(),
    accountController= require("../controllers/accountController"),
    apiController = require("../controllers/apiController"),
    adminController = require("../controllers/adminController"),
    dashboardController = require("../controllers/dashboardController");


//router.post("/login", accountController.apiAuthenticate); --FUTURE UPDATE
router.get("/dashboard/:custId/:poolId", dashboardController.getPool, dashboardController.respondJSON);

// router.use(accountController.verifyJWT); --FUTURE UPDATE
router.use(apiController.verifyToken);

router.get("/users", accountController.index, dashboardController.respondJSON);

router.use(adminController.verifyAdmin);

router.get("/token", apiController.getToken);

router.use(accountController.errorJSON);

module.exports = router;