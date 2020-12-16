const FAQ = require("../models/FAQ");

module.exports = {

    // render landing page
    indexView: (req, res) => {
        res.render("index");
    },

    // render help page
    helpView: (req, res) => {
        res.render("help");
    },

    //render faq page
    faqView: (req, res) => {
        res.render("faq");
    },

    //redirect locals
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    // get all FAQ from database
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