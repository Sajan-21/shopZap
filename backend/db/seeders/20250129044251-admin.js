const users = require('../models/users');

("use strict");

module.exports = {
  up: (models, mongoose) => {
    return models.users
      .insertMany([
        {
          _id: "673c4f64ea9342c77762f3ba",
          name: "John",
          email: "john@gmail.com",
          password: "$2a$10$tdxH/dQX.g0xa1EAkl6ltuvTl2WIGKrUtVn5wNKOWwi3LZIvMUkE2",
          role: "Admin",
        },
      ])
      .then((res) => {
        console.log(res.insertedCount);
      });
  },

  down: (models, mongoose) => {
    return models.users
      .deleteMany({
        _id: { $in: [
          "673c4f64ea9342c77762f3ba"
        ] },
      })
      .then((res) => {
        console.log(res.deletedCount);
      });
  },
};