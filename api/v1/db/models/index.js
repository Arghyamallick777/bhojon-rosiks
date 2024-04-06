'use strict';
const monggose = require('mongoose');
const process = require('process');

const AdminConfig = require('./admin-config.model');
const User = require('./user.model');
const Role = require('./role.model');
const Session = require('./session.model');
const Otp = require('./otp.model');

const mongooseConn = monggose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongooseConn.then(r => {
  console.log("Connection success");
}).catch(e => {
  console.log("Connection Error: ", e);
});

module.exports = {
  AdminConfig,
  User,
  Role,
  Session,
  Otp
};