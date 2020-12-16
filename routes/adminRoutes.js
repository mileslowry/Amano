const router = require("express").Router(),
    adminController = require("../controllers/adminController"),
    messageController = require("../controllers/messageController"),
    customerController = require("../controllers/customerController"),
    accountController = require("../controllers/accountController");

// Check admin status before allowing access to sites
router.use(adminController.verifyAdmin);

router.get("/users", accountController.index, accountController.indexView);
router.post("/users/update-all", accountController.updateUsers);
router.get("/stats", accountController.trackAppUse);
router.get("/message", messageController.getUnresolvedTickets);
router.get("/message/:id/edit", messageController.getTicketById);
router.post("/message/:id/update", messageController.updateTicketById);
router.get("/customer", customerController.index, customerController.indexView);
router.delete("/customer/:id/delete", customerController.deleteAdmin, customerController.redirectView);

module.exports = router;