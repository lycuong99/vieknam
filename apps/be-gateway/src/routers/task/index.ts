import { asyncHandler } from '@be-gateway/lib/async-handle';
import { authMiddleware } from '@be-gateway/middlewares';
import { beProjectMemberMiddleware } from '@be-gateway/middlewares/beProjectMemberMiddleware';
import { AuthRequest } from '@be-gateway/types';
import { Task } from '@prisma/client';
import { mdTaskAdd } from '@shared/models';
import { Response, Router } from 'express';

const router = Router();

router.use([authMiddleware, beProjectMemberMiddleware]);

router.get(
	'/task',
	asyncHandler(async (req: AuthRequest, res: Response) => {
		res.json({
			status: 200,
			data: []
		});
	})
);

router.post(
	'/task',
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const { desc, priority, dueDate, assigneeIds, title, projectId } = req.body as Task;
		const userId = req.authen.id;

		const result = await mdTaskAdd({
			desc,
			startDate: null,
			dueDate,
			assigneeIds,
			title,
			projectId: projectId,
			parentTaskId: null,
			priority,
			tagIds: [],
			taskPoint: null,
			taskStatusIds: [],

			createdBy: userId,
			createdAt: new Date(),
			updatedAt: null,
			updatedBy: null
		});

		res.json({
			status: 200,
			data: result
		});
	})
);

export default router;
