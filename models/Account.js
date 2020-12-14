"use strict";

const mongoose = require("mongoose"),
  {Schema} = mongoose,
  passportLocalMongoose = require("passport-local-mongoose"),
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      customers: [{ type: Schema.Types.ObjectId, ref: "Customer" }]
    },
    {
      timestamps: true
    }
  );

// userSchema.virtual("fullName").get(function() {
//   return `${this.name.first} ${this.name.last}`;
// });

// userSchema.pre("save", function(next) {
//   let user = this;
//   if (user.subscribedAccount === undefined) {
//     Subscriber.findOne({
//       email: user.email
//     })
//       .then(subscriber => {
//         user.subscribedAccount = subscriber;
//         next();
//       })
//       .catch(error => {
//         console.log(`Error in connecting subscriber:${error.message}`);
//         next(error);
//       });
//   } else {
//     next();
//   }
// });

// userSchema.pre("save", function(next) {
//   let user = this;
//   if (!user.apiToken) user.apiToken = randToken.generate(16);
//   next();
// });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema, "users");
