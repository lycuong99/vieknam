import { Router } from 'express';
import authRouter from './auth';
import organizationRouter from './organization';
import projectRouter from './project';
import taskRouter from './task';
import projectMemberRouter from './member';

const router = Router();

router.use(authRouter);
router.use(organizationRouter);
router.use(projectRouter);
router.use(taskRouter);
router.use(projectMemberRouter);

export default router;
