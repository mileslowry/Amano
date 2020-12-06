const router = require("express").Router(),
    customerController= require("../controllers/customerController");

router.get("/", customerController.index, customerController.indexView);
router.get("/new", customerController.addCustomerView);
router.post("/create", customerController.addCustomer, customerController.redirectView);
router.get("/:id", customerController.getCustomer, customerController.customerView);
router.get("/:id/edit", customerController.edit);
router.put("/:id/update", customerController.update, customerController.redirectView);
router.delete("/:id/delete", customerController.delete, customerController.redirectView);

module.exports = router;