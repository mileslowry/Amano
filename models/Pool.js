"use strict";

const mongoose = require("mongoose"),
  Customer = require("../models/Customer"),
  { Schema } = mongoose;

const chemReadingSchema = new mongoose.Schema({
  pH: {
    type: Number,
    min: 0,
    max: 14,
    required: true,
  },
  cl: {
    type: Number,
    required: true,
  },
  alk: {
    type: Number,
    required: true,
  },
  readTime: {
      type: Date,
      default: new Date()
  }
});

const poolSchema = new mongoose.Schema({
  gallons: {
    type: Number,
    required: true
  },
  chemType: {
    type: String,
    required: true
  },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  chemReading: [chemReadingSchema]
});

poolSchema.pre("save", function(next) {
  let customer = this.customer;
  let newPool = {
    pools: this._id
  };
  Customer.findOneAndUpdate({_id: customer}, {
    $addToSet: newPool
  })
    .then(
      next()
    )
    .catch(error => {
      console.log(`Error in adding pool to customer :${error.message}`);
      next(error);
    });
  } 
);

module.exports = mongoose.model("Pool", poolSchema, "Pool");