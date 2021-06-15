import express from 'express';
import users from '../controllers/user.controller';
import checkToken from '../middlewares/verify-token';

const router = express.Router();

router.use(checkToken);
router.get('/', users.findAll);
router.post('/', users.create);
router.delete('/:id', users.deleteOne);
router.put('/:id', users.update);

export default router;
