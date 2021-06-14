import Sequelize from 'sequelize';
import sequelize from '../db/orm/index';

const nameValidaton = {
  isAlpha: true,
  notNull: true,
  notEmpty: true,
  len: [2, 40],
};

const emailValidation = {
  notNull: true,
  notEmpty: true,
  isEmail: true,
};

const User = sequelize.define('user', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: nameValidaton,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: nameValidaton,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: emailValidation,
  },
}, {
  timestamps: true,
  underscored: true,
});

export default User;
