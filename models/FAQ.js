"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("FAQ", faqSchema, "FAQ");