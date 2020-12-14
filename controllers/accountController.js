const User = require("../models/Account"),
  passport = require("passport"),
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
  const checkBool = (value) => {
    if (value == "true" || typeof value == 'object') {
      return true;
    }
    return false;
  };

module.exports = {

  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render('admin/users');
  },

  updateUsers: async (req, res) => {
    console.log(req.body);
    try {
      let length = await req.body.length;
      for (let i = 0; i < length; i++) {
        let userId = await req.body.id[i];
        let userParams = await {
          name: {
            first: req.body.first[i],
            last: req.body.last[i]
          },
          email: req.body.email[i],
          isAdmin: checkBool(req.body.admin[i])
        };
        await User.findByIdAndUpdate(userId, {
          $set: userParams
        });
      }
      await res.redirect("/admin/users");
    } catch (error) {
      await res.redirect("/admin/users");
      console.log(error.message);
    }
  },

  login: (req, res) => {
    res.render("users/login");
  },

  loginOrRegister: (req, res) => {
    res.render('account/login');
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

  viewAccount: (req, res) => {
    res.render("account/index");
  }
}