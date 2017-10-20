var Sequelize = require('sequelize');
var db = require('../index.js');
const {Campus} = require('./campus');


module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  birthday: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false
  }
}, {
  defaultScope: {
    include: [{model: db.model('campus')}]
  }
});

