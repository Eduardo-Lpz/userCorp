import _ from 'lodash';
import User from '../models/user.model';
// import logger from '../../services/logger_service'; // implement custom logger

const create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  try {
    await User.create(user);
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
    const users = await User.findAll();
    const parsedData = users.map(user => {
      const {
        id, first_name, last_name, email,
      } = user;
      return {
        id,
        first_name,
        last_name,
        email,
      };
    });
    res.status(200).send(parsedData);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.',
    });
  }
};

const update = async (req, res) => {
  if (!req.body || _.isEmpty(req.body)) {
    res.status(400).send({
      code: 400,
      message: 'Invalid or missing data.',
    });
    return;
  }

  try {
    const result = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      fields: ['first_name', 'last_name', 'email'],
    });

    if (!result[0]) {
      res.status(400).send({
        code: 400,
        message: 'There is nothing to update.',
      });
      return;
    }

    res.status(200).send({
      message: 'Successfully updated ALLOWED fields [\'first_name\', \'last_name\', \'email\'].',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating user with id ${req.params.id}.`,
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: `Successfully deleted user with id ${req.params.id}.`,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting user with id ${req.params.id}.`,
    });
  }
};

export default {
  create,
  findAll,
  update,
  deleteOne,
};
