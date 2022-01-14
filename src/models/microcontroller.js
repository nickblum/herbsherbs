const Sequelize = require('sequelize');
const db = require('../db/database');

const MCU = db.define('mcu', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  rf_channel: {
    type: Sequelize.SMALLINT
  }
});

MCU.sync({ alter: true }).then(() => {});
module.exports = MCU;
