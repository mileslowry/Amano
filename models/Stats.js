"use strict";

const mongoose = require("mongoose"),
  {Schema} = mongoose;

const statsSchema = new mongoose.Schema(
    {
      ip: {
        address: {
          type: String,
        },
        ipType: {
          type: String,
        }
      },
      location: {
        continent: {
            type: String
        },
        country: {
            type: String
        },
        city: {
            type: String
        },
        zipCode: {
            type: Number
        }
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model("Stats", statsSchema, "stats");