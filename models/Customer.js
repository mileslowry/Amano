"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

const noteSchema = new mongoose.Schema({
  note: {
    type: String
  },
  dateSaved: {
    type: Date,
    default: new Date()
  },
  dateUpdated: {
    type: Date,
    default: null
  }
});

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
    lowercase: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
  notes: [
    {noteSchema}
  ],
  technician: {
    type: Schema.Types.ObjectId
  },
  pools: [{ type: Schema.Types.ObjectId, ref: "Pool", autopopulate: true }]
});

customerSchema.plugin(require('mongoose-autopopulate'));
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