const dbconfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;
console.log(db.url);

db.user = require('./user.model');
db.role = require('./role.model');

db.Roles = ["user", "admin", "moderator"];
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;