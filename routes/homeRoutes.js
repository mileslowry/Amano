const router = require("express").Router(),
    homeController= require("../controllers/homeController");

router.get("/", homeController.indexView);
router.get("/faq", homeController.indexFAQ, homeController.faqView);
router.get("/help", homeController.helpView);

module.exports = router;