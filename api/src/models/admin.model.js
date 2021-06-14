import Sequelize from 'sequelize';
import sequelize from '../db/orm/index';

const emailValidation = {
  notNull: true,
  notEmpty: true,
  isEmail: true,
};

const User = sequelize.define('admin', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: emailValidation,
  },
  password: {
    type: Sequelize.STRING(64),
    is: /^[0-9a-f]{64}$/i,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

export default User;
