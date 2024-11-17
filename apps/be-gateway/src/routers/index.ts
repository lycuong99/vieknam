import { Router } from 'express';
import authRouter from './auth';
import organizationRouter from './organization';
import projectRouter from './project';

const router = Router();

router.use(authRouter);
router.use(organizationRouter);
router.use(projectRouter);

export default router;
