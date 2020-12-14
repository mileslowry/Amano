"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
  custFName: {
    type: String,
    required: true
  },
  custLName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String
  },
  dateJoined: {
    type: Date
  },
  technician: {
    type: Schema.Types.ObjectId
  },
  pools: [{ type: Schema.Types.ObjectId, ref: "Pool" }]
});

customerSchema.plugin(passportLocalMongoose);
 
customerSchema.pre("save", function(next) {
  let user = this.technician;
  let newCustomer = {
    customers: this._id
  };
  User.findOneAndUpdate({_id: user}, {
    $addToSet: newCustomer
  })
    .then(
      next()
    )
    .catch(error => {
      console.log(`Error in connecting user :${error.message}`);
      next(error);
      });
  } 
);

module.exports = mongoose.model("Customer", customerSchema, "Customer");