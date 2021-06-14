import { Router } from 'express';
import userRouter from './user.routes';
import adminRouter from './admin.routes';

const router = Router({ mergeParams: true });
const apiBase = process.env.API_BASE_V1;

router.use(`${apiBase}/users`, userRouter);
router.use(`${apiBase}/admin`, adminRouter);

export default router;
