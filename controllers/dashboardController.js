const Pool = require("../models/Pool");
const Customer = require("../models/Customer");
const httpStatus = require("http-status-codes");

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

    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },

    addPool: (req, res, next) => {
        let custId = req.params.custId;
        poolParams = {
            gallons: req.body.gallons,
            chemType: req.body.chemType,
            customer: custId
        };
        Pool.create(poolParams)
            .then(pool => {
                res.locals.redirect = `/dashboard`;
                res.locals.pool = pool;
                next();
            })
            .catch((error) => {
                console.log(`There's been a problem adding a pool: ${error.message}`);
                next(error);
            })
    },

    addPoolView: (req, res) => {
        res.render("dashboard/new");
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
    indexCustomers: async (req, res) => {
        let currentUser = req.user;
        try {
            let customers = await User.findById(currentUser._id, "customers").populate("customers");
            console.log(customers);
            res.render('customer/index', {
                customers: customers.customers
            });
        } catch (error) {
            console.log(`There's been an error finding customers with indexCustomer: ${error.message}`);
        }
    },

    //DEPRECATED
    //View all customers
    //   indexCustomerView: (req, res) => {
    //       res.render('customer/index');
    //   },

    indexCustomerAlerts: (req, res, next) => {
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

    indexCustomerAlertsView: (req, res) => {
        res.render('dashboard/pools-with-alerts');
    },

    chemicalsToBring: (req, res) => {
        res.render("dashboard/chemicals-to-bring");
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }

};