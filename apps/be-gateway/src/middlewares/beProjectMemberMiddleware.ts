import { AuthRequest } from '@be-gateway/types';
import { mdMemberBelongProject } from '@shared/models';
import { NextFunction, Response } from 'express';

export const beProjectMemberMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const { id: userId } = req.authen;
	const { body, query } = req;
	const projectId = (query.projectId as string) || (body.projectId as string);

	if (!projectId) {
		return res.status(400).json({
			status: 400,
			message: 'Project id is required'
		});
	}

	const result = await mdMemberBelongProject(userId, projectId);
	if (!result) {
		return res.status(403).json({
			status: 403,
			message: `You are not a member of project ${projectId}`
		});
	}

	console.log('Passed !, you are project member');
	next();
};
