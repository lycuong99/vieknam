import { asyncHandler } from '@be-gateway/lib/async-handle';
import { authMiddleware } from '@be-gateway/middlewares';
import { beProjectMemberMiddleware } from '@be-gateway/middlewares/beProjectMemberMiddleware';
import { AuthRequest } from '@be-gateway/types';
import { MemberRole, Members } from '@prisma/client';
import { mdMemberAdd, mdMemberGetAllByProjectId } from '@shared/models';
import { Response, Router } from 'express';

const router = Router();

router.use([authMiddleware, beProjectMemberMiddleware]);

router.get(
	'/project/member',
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const { projectId } = req.query;

		const members = await mdMemberGetAllByProjectId(projectId as string);
		const users = members.map(member => ({ ...member.users, role: member.role }));

		res.json({
			status: 200,
			data: users
		});
	})
);

/**
 * JOIN PROJECT
 */
router.post(
	'/project/member',
	asyncHandler(async (req: AuthRequest, res: Response) => {
		// const { role, projectId } = req.body as Members;
		// const userId = req.authen.id;

		// mdMemberAdd({
		// 	projectId,
		// 	role: role,
		// 	uid
		// });

		res.json({
			status: 200,
			data: []
		});
	})
);

export default router;
