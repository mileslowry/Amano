const Pool = require("../models/Pool");
const Customer = require("../models/Customer");
const httpStatus = require("http-status-codes");

module.exports = {

    // render dashboard view
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

    //Get the data for all pools and return object with alerts
    indexPools: (req, res, next) => {
        let alerts = [];
        let pHAlert;
        let clAlert;
        let alkAlert;
        Pool.find()
        .then(pools => {
            pools.forEach(pool => {
                let numReadings = Object.keys(pool.chemReading).length;

                if (pool.chemReading.length != 0) {
                    let pHRead = pool.chemReading[numReadings - 1].pH;
                    let clRead = pool.chemReading[numReadings - 1].cl;
                    let alkRead = pool.chemReading[numReadings - 1].alk;
    
                    if (pHRead < 7.4) {
                        pHAlert = "Low";
                    } else if (pHRead > 7.6) {
                        pHAlert = "High";
                    } else {
                        pHAlert = "Green";
                    };
    
                    if (clRead <= 1) {
                        clAlert = "Low";
                    } else if (clRead >= 3) {
                        clAlert = "High";
                    } else {
                        clAlert = "Green";
                    };
    
                    if (alkRead < 90) {
                        alkAlert = "Low";
                    } else if (alkRead > 110) {
                        alkAlert = "High";
                    } else {
                        alkAlert = "Green";
                    };
    
                    alerts.push({
                        pHAlert: pHAlert,
                        clAlert: clAlert,
                        alkAlert: alkAlert,
                        poolId: pool._id
                    })
                };          
            });
            res.locals.alerts = alerts;
            next();
        })
        .catch(error => {
            console.log(error);
            next(error);
        })
    },

    // Get returned data in JSON format
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    // View error in JSON format
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

    // Add a pool -- generate random data for chemReadings
    addPool: (req, res, next) => {
        let custId = req.params.custId;
        let d = new Date();
        poolParams = {
            gallons: req.body.gallons,
            chemType: req.body.chemType,
            customer: custId,
            chemReading: [
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) - 5)
                },
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) + 1)
                }, 
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) + 1)
                },
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) + 1)
                },
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) + 1)
                },
                {
                    pH: ((Math.random() * (8 - 7) + 7).toFixed(1)), 
                    cl: ((Math.random() * 4).toFixed(1)), 
                    alk: ((Math.random() * (125 - 75) + 75).toFixed(1)), 
                    readTime: d.setDate(d.getDate(d) + 1)
                }
            ]
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

    // Render view to add pool
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
            res.render('dashboard/index', {
                customers: customers.customers
            });
        } catch (error) {
            console.log(`There's been an error finding customers with indexCustomer: ${error.message}`);
        }
    },

    // Index customers and render in pools-with-alerts view
    indexCustomerAlerts: async (req, res) => {
        let currentUser = req.user;
        try {
            let customers = await User.findById(currentUser._id, "customers").populate("customers");
            res.render('dashboard/pools-with-alerts', {
                customers: customers.customers
            });
        } catch (error) {
            console.log(`There's been an error finding customers with indexCustomer: ${error.message}`);
        }
    },

    indexCustomerAlertsView: (req, res) => {
        res.render('dashboard/pools-with-alerts');
    },

    //Part of Second Phase of Development
    // chemicalsToBring: (req, res) => {
    //     res.render("dashboard/chemicals-to-bring");
    // },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }

};