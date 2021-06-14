import Sequelize from 'sequelize';
// import logger from '../../services/logger_service';

const sqlze = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // logging: msg => logger.info(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
  },
);

export default sqlze;
