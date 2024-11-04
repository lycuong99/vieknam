import { Router } from 'express';
import authRouter from './auth';
import organizationRouter from './organization';

const router = Router();

router.use(authRouter);
router.use(organizationRouter);

export default router;
