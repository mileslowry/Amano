const router = require("express").Router(),
    accountController= require("../controllers/accountController");

router.get("/", accountController.indexView);
router.get("/login", accountController.loginView);
router.post("/login", accountController.authenticate);
router.get("/logout", accountController.logout, accountController.redirectView);
router.get("/register", accountController.registerView);
router.post("/create", /*accountController.validate,*/ accountController.registerUser, accountController.redirectView);
router.get("/customer", accountController.index, accountController.indexView);
router.get("/customer/new", accountController.addCustomerView);
router.post("/customer/create", accountController.addCustomer, accountController.redirectView);
router.get("/customer/:id", accountController.getCustomer, accountController.customerView);
router.get("/customer/:id/edit", accountController.edit);
router.put("/customer/:id/update", accountController.update, accountController.redirectView);
router.delete("/customer/:id/delete", accountController.delete, accountController.redirectView);

module.exports = router;