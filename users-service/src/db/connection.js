import Sequelize from 'sequelize';
import accessEnv from '#root/helpers/accessEnv';

const DB_URI = accessEnv('DB_URI');

const conn = new Sequelize(DB_URI, {
  dialectOptions: {
    charset: 'utf8',
    multipuleStatements: true,
  },
  logging: false,
});

module.exports = conn;
