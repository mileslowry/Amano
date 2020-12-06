const router = require("express").Router(),
    homeController= require("../controllers/homeController");

router.get("/", homeController.indexView);
router.get("/about", homeController.aboutView);
router.get("/faq", homeController.indexFAQ, homeController.faqView);
router.get("/help", homeController.helpView);
router.post("/help/send", homeController.getHelp, homeController.redirectView);
module.exports = router;