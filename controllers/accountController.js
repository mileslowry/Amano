const passport = require("passport");
const getUserParams = body => {
  return {
      name: {
      first: body.first,
      last: body.last
  },
  email: body.email,
  address: body.address,
  city: body.city,
  state: body.state,
  password: body.password,
  zipCode: body.zipCode
  };
};

module.exports = {
    indexView: (req, res) => {
      res.render("account/index")
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

      // Edit a customer
      edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
          .then(user => {
            res.render("account/edit", {
              user: user
            });
          })
          .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
          });
      },

      //Apply edits to customer record in databse
      update: (req, res, next) => {
        let userId = req.params.id,
          userParams = {
            fName: req.body.first,
            lName: req.body.last,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode
          };
    
        User.findByIdAndUpdate(userId, {
          $set: userParams
        })
          .then(user => {
            res.locals.redirect = `/account/${userId}`;
            res.locals.user = user;
            next();
          })
          .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
          });
      },
    
      delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
          .then(() => {
            res.locals.redirect = "/account";
            next();
          })
          .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
          });
      },

      //Add a new customer
      addUser: (req, res, next) => {
        let userParams = {
          fName: req.body.first,
          lName: req.body.last,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
        };
        User.create(userParams)
        .then(user => {
          res.locals.redirect = "/account";
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error saving new user: ${error.message}`);
          next(error);
        });
      },

      //View the page for creating a new customer
      addUserView: (req, res) => {
        res.render('account/new');
      }
      
}