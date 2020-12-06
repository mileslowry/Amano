const router = require("express").Router(),
    accountController= require("../controllers/accountController");

router.get("/", accountController.loginOrRegister);
router.get("/login", accountController.loginView);
router.post("/login", accountController.authenticate);
router.get("/logout", accountController.logout, accountController.redirectView);
router.get("/register", accountController.registerView);
router.post("/create", /*accountController.validate,*/ accountController.registerUser, accountController.redirectView);
router.get("/:id", accountController.viewAccount);

module.exports = router;