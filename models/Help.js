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
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Help", helpSchema, "Help");