const router = require("express").Router(),
    adminController = require("../controllers/adminController"),
    customerController= require("../controllers/customerController");

router.get("/new", customerController.addCustomerView);
router.post("/create", customerController.addCustomer, customerController.redirectView);
router.get("/:id", customerController.getCustomer, customerController.customerView);
router.get("/:id/edit", customerController.edit);
router.put("/:id/update", customerController.update, customerController.redirectView);
router.delete("/:id/delete", customerController.delete, customerController.redirectView);

router.use(adminController.verifyAdmin);

router.get("/", customerController.index, customerController.indexView);

module.exports = router;