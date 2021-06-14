import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';

import Admin from '../models/admin.model';

const createToken = id => {
  const payload = {
    userId: id,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix(),
  };
  return jwt.encode(payload, process.env.JWT_KEY);
};

const login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    const adminData = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    const { id, password } = adminData[0];
    const equals = bcrypt.compareSync(req.body.password, password);

    if (!equals) {
      res.status(404).send({
        error: 'Error, invalid user/password.',
      });
    } else {
      res.type('application/json').status(200).json({
        code: 200,
        message: createToken(id),
      });
    }
  } catch (err) {
    res.status(404).send({
      code: 404,
      message: 'Error, invalid user/password.',
    });
  }
};

const create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  if (req.body.password !== req.body.password_confirmation) {
    res.status(400).send({
      message: 'passwords did not match',
    });
    return;
  }
  const admin = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  try {
    await Admin.create(admin);
    res.status(200).send({
      message: 'Successfully created new user',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.',
    });
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).send(admins);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.',
    });
  }
};

export default {
  login,
  create,
  findAll,
};
