import { create } from 'zustand';
import { Router } from 'express';
import { mdMemberAdd, mdProjectAdd, mdProjectGetByOrgId } from '@shared/models';
import { MemberRole, Project } from '@prisma/client';
import { AuthRequest } from '@be-gateway/types';
import { asyncHandler } from '@be-gateway/lib/async-handle';
import { authMiddleware } from '@be-gateway/middlewares';

const router = Router();

router.use([authMiddleware]);

router.get('/:organizationId/project', async (req, res) => {
	const result = await mdProjectGetByOrgId(req.params.organizationId);
	res.json({
		status: 200,
		data: result
	});
});

router.post(
	'/:organizationId/project',
	asyncHandler(async (req: AuthRequest, res) => {
		const body = req.body as Pick<Project, 'name' | 'desc' | 'organizationId'>;
		const result = await createProject({
			...body,
			userId: req.authen.id,
			organizationId: req.params.organizationId
		});

		mdMemberAdd({
			uid: req.authen.id,
			role: MemberRole.MANAGER,
			projectId: result.id,

			createdBy: req.authen.id,
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

function createProject({
	name,
	desc,
	organizationId,
	userId
}: {
	name: string;
	desc: string;
	organizationId: string;
	userId: string;
}) {
	return mdProjectAdd({
		name,
		desc,
		organizationId,

		iconn: null,
		cover: null,
		createdBy: userId,
		createdAt: new Date(),
		updatedAt: null,
		updatedBy: null
	});
}

export default router;
