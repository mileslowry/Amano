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
  pools: [{ type: Schema.Types.ObjectId, ref: "Pool" }]
});

module.exports = mongoose.model("Customer", customerSchema, "Customer");