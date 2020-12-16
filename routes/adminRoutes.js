const router = require("express").Router(),
    adminController = require("../controllers/adminController"),
    messageController = require("../controllers/messageController"),
    accountController = require("../controllers/accountController");

// Check admin status before allowing access to sites
router.use(adminController.verifyAdmin);

router.get("/users", accountController.index, accountController.indexView);
router.post("/users/update-all", accountController.updateUsers);
router.get("/stats", accountController.trackAppUse);
router.get("/message", messageController.getUnresolvedTickets);
router.get("/message/:id/edit", messageController.getTicketById);
router.post("/message/:id/update", messageController.updateTicketById);

module.exports = router;