import express from 'express';
import admins from '../controllers/admin.controller';

const router = express.Router();

router.post('/login', admins.login);

router.get('/', admins.findAll);
router.post('/', admins.create);

export default router;
