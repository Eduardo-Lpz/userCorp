import jwt from 'jwt-simple';
import moment from 'moment';
import logger from '../services/logger_service';

// eslint-disable-next-line
const checkToken = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(' ')[0] === 'Bearer') {
    logger.warn('Missing/Invalid token');
    return res.status(400).json({
      error: 'Missing/Invalid token',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload = null;
  try {
    payload = jwt.decode(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }

  if (moment().unix() > payload.expiresAt) {
    return res.json({
      error: 'Token expired',
    });
  }

  req.userId = payload.userId;
  next();
};

export default checkToken;
