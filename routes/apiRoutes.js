const router = require("express").Router(),
    accountController= require("../controllers/accountController"),
    apiController = require("../controllers/apiController"),
    dashboardController = require("../controllers/dashboardController");

router.get("/token", apiController.getToken);
//router.post("/login", accountController.apiAuthenticate); --FUTURE UPDATE

router.get("/dashboard/:custId/:poolId", dashboardController.getPool, dashboardController.respondJSON);

// router.use(accountController.verifyJWT); --FUTURE UPDATE
router.use(apiController.verifyToken);

router.get("/users", accountController.index, dashboardController.respondJSON);
router.use(accountController.errorJSON);

module.exports = router;