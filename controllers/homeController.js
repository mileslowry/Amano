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
    },
}