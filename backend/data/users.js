const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Moyise",
    email: "moyise@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Ghost",
    email: "ghost@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Phantom",
    email: "phantom@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

module.exports = users;
