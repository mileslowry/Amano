"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

const chemReadingSchema = new mongoose.Schema({
  pH: {
    type: Number,
    required: true
  },
  cl: {
    type: Number,
    required: true
  },
  alk: {
    type: Number,
    required: true
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
  chemReading: [chemReadingSchema]
});

module.exports = mongoose.model("Pool", poolSchema, "Pool");