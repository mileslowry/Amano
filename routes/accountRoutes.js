const router = require("express").Router(),
    accountController= require("../controllers/accountController");

router.get("/", accountController.indexView);
router.get("/login", accountController.loginView);
router.post("/login", accountController.authenticate);
router.get("/logout", accountController.logout, accountController.redirectView);
router.get("/register", accountController.registerView);
router.post("/create", /*accountController.validate,*/ accountController.registerUser, accountController.redirectView);

module.exports = router;