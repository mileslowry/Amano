const Pool = require("../models/Pool");
const Customer = require("../models/Customer");

module.exports = {
    dashView: (req, res) => {
        res.render("dashboard/index");
    },

    //See one customer's pool dashboard
    show: (req, res) => {
        res.render("dashboard/show-pool");
    },

    //Get the data for one pool
    getPool: (req, res, next) => {
        let poolId = req.params.poolId;
        Pool.findById(poolId)
            .then(pool => {
                res.locals.pool = pool;
                next();
            })
            .catch(error => {
                console.log(`Error fetching pool: ${error.message}`);
                next(error);
            });
    },

    //Get the data for one customer
    getCustomer: (req, res, next) => {
        let custId = req.params.custId;
        Customer.findById(custId)
            .then(customer => {
                res.locals.customer = customer;
                next();
            })
            .catch(error => {
                console.log(`Error fetching customer: ${error.message}`);
                next(error);
            });
      },
    
    //Get all customers
    indexCustomer: (req, res, next) => {
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
      
      //View all customers
      indexCustomerView: (req, res) => {
          res.render('customer/index');
      }
};