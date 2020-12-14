const router = require("express").Router(),
    messageController= require("../controllers/messageController");

router.get("/message-sent", messageController.messageSentView);
router.post("/help/send", messageController.getHelp, messageController.redirectView);

module.exports = router;