const Pool = require("../models/Pool");
const User = require("../models/User"),
    Customer = require("../models/Customer")
    passport=require("passport"),
    getUserParams = body => {
        return {
            name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        zipCode: body.zipCode
        };
    };

module.exports = {
    index: (req, res, next) => {
      Customer.find()
        .then(customers => {
          res.locals.customers = customers;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user customers: ${error.message}`);
          next(error);
        });
    },

    indexView: (req, res) => {
        res.render('customer/index');
    },

    loginView: (req, res) => {
        res.render('account/login');
    },

    registerView: (req, res) => {
        res.render('account/register');
    },

    //create new user
    registerUser: (req, res, next) => {
        if (req.skip) next();
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
          if (user) {
            //req.flash("success", `${user.fullName}'s account created successfully!`);
            res.locals.redirect = "login";
            next();
          } else {
            //req.flash("error", `Failed to create user account because: ${error.message}.`);
            res.locals.redirect = "/account/register";
            next();
          }
        });
      },

      validate: async (req, res, next) => {
        await check("email").normalizeEmail({
          all_lowercase: true
        }).trim().run(req);
        await check("email", "Email is invalid").isEmail().run(req);
        await check("zipCode", "Zip code is invalid")
          .notEmpty().isInt().isLength({
            min: 5,
            max: 5
          }).equals(req.body.zipCode).run(req);
        await check("password", "Password cannot be empty").notEmpty().run(req);
    
        const error = validationResult(req);
        if (!error.isEmpty()) {
          let messages = error.array().map(e => e.msg);
          req.skip = true;
          req.flash("error", messages.join(" and "));
          res.locals.redirect = "/account/register";
          next();
        } else {
          next();
        }
    
      },

      redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
      },

      authenticate: passport.authenticate("local", {
        failureRedirect: "/account/register",
        successRedirect: "/dashboard",
      }),

      logout: (req, res, next) => {
        req.logout();
        res.locals.redirect = "/";
        next();
      },

      // Find one customer by ID
      getCustomer: (req, res, next) => {
        let id = req.params.id;
        Customer.findById(id)
            .then(customer => {
                res.locals.customer = customer;
                next();
            })
            .catch(error => {
                console.log(`Error fetching customer: ${error.message}`);
                next(error);
            });
      },

      customerView: (req, res) => {
        res.render('customer/show');
      },

      // Edit a customer
      edit: (req, res, next) => {
        let custId = req.params.id;
        Customer.findById(custId)
          .then(customer => {
            res.render("customer/edit", {
              customer: customer
            });
          })
          .catch(error => {
            console.log(`Error fetching customer by ID: ${error.message}`);
            next(error);
          });
      },

      //Apply edits to customer record in databse
      update: (req, res, next) => {
        let custId = req.params.id,
          customerParams = {
            custFName: req.body.first,
            custLName: req.body.last,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode
          };
    
        Customer.findByIdAndUpdate(custId, {
          $set: customerParams
        })
          .then(customer => {
            res.locals.redirect = `/account/customer/${custId}`;
            res.locals.customer = customer;
            next();
          })
          .catch(error => {
            console.log(`Error updating customer by ID: ${error.message}`);
            next(error);
          });
      },
    
      delete: (req, res, next) => {
        let custId = req.params.id;
        Customer.findByIdAndRemove(custId)
          .then(() => {
            res.locals.redirect = "/account/customer";
            next();
          })
          .catch(error => {
            console.log(`Error deleting customer by ID: ${error.message}`);
            next();
          });
      },

      //Add a new customer
      addCustomer: (req, res, next) => {
        let customerParams = {
          custFName: req.body.first,
          custLName: req.body.last,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
        };
        Customer.create(customerParams)
        .then(customer => {
          res.locals.redirect = "/account/customer";
          res.locals.customer = customer;
          next();
        })
        .catch(error => {
          console.log(`Error saving new customer: ${error.message}`);
          next(error);
        });
      },

      //View the page for creating a new customer
      addCustomerView: (req, res) => {
        res.render('customer/new');
      }
      
}