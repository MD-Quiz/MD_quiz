'use strict'
const Sequelize = require('sequelize');
let privateKey = require('./../../testingKeys.js').dbKey;
const DB = new Sequelize(privateKey);

  const UserTests = DB.define('usertest', {
    uuid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    changePassword: Sequelize.BOOLEAN,
  });

// UserTests.sync({force: true});

  // UserTests.build({ uuid: 69, email: 'Brendan', password: 'hello', changePassword: false }).save();


module.exports = UserTests;
