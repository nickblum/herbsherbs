const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: './assets/nox.sqlite',
  logging: false
});
