const Help = require("../models/Help");
const FAQ = require("../models/FAQ");

module.exports = {
    indexView: (req, res) => {
        res.render("index");
    },

    aboutView: (req, res) => {
        res.render("about");
    },

    helpView: (req, res) => {
        res.render("help");
    },

    faqView: (req, res) => {
        res.render("faq");
    },
    
    // Insert new help request into database
    getHelp: (req, res, next) => {
        let helpParams = {
            subject: req.body.subject,
            email: req.body.email,
            message: req.body.message
        };
        Help.create(helpParams)
            .then(help => {
                res.locals.redirect = "/faq";
                res.locals.help = help;
                next();
            })
            .catch(error => {
                console.log(`Error sending help request: ${error.message}`);
                next(error);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    indexFAQ: (req, res, next) => {
        FAQ.find()
            .then(questions => {
                res.locals.questions = questions;
                next();
            })
            .catch(error => {
                console.log(`Error fetching FAQ: ${error.message}`);
                next(error);
            });
    }
}