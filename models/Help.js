"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

const helpSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  message: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: new Date()
  },
  dateResolved: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Help", helpSchema, "Help");