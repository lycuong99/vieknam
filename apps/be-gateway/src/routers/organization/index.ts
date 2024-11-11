import { InvitationStatus, Organization, OrganizationRole } from '@prisma/client';
import { asyncHandler } from '../../lib/async-handle';
import { authMiddleware } from '../../middlewares/index';
import { AuthRequest } from '../../types';
import { mdOrgAdd, mdOrgGet, mdOrgMemberAdd, mdOrgMemGetByUid } from '@shared/models';
import { Response, Router } from 'express';

const router = Router();

router.use([authMiddleware]);

router.get(
	'/org',
	asyncHandler(async (req: AuthRequest, res) => {
		const uId = req.authen.id;

		const orgMems = await mdOrgMemGetByUid(uId);
		const orgIds = orgMems.map(orgMem => orgMem.organizationId);
		const orgs = await mdOrgGet(orgIds);

		res.json({
			status: 200,
			data: orgs
		});
	})
);

router.post(
	'/org',
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const body = req.body as Pick<Organization, 'name' | 'desc'>;
		const { id } = req.authen;

		const result = await mdOrgAdd({
			name: body.name,
			desc: body.desc,

			avatar: null,
			cover: null,
			createdAt: new Date(),
			createdBy: id,
			updatedAt: null,
			updatedBy: null
		});

		mdOrgMemberAdd({
			uid: id,
			role: OrganizationRole.ADMIN,
			organizationId: result.id,
			status: InvitationStatus.ACCEPTED,

			createdAt: new Date(),
			createdBy: id,
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
