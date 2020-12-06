const Pool = require("../models/Pool");
  Customer = require("../models/Customer"),
  passport = require("passport");


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
    res.render("customer/index");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
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
        res.locals.redirect = `/customer/${custId}`;
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
        res.locals.redirect = "/customer";
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
        res.locals.redirect = "/customer";
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