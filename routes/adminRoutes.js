const router = require("express").Router(),
    adminController = require("../controllers/adminController"),
    accountController = require("../controllers/accountController");

// Check admin status before allowing access to sites
router.use(adminController.verifyAdmin);

router.get("/users", accountController.index, accountController.indexView);
router.post("/users/update-all", accountController.updateUsers);

module.exports = router;