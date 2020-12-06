"use strict";

const mongoose = require("mongoose");

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
  },
  poolId: { type: Schema.Types.ObjectId, ref: "Pool" }
});

module.exports = mongoose.model("Reading", chemReadingSchema);