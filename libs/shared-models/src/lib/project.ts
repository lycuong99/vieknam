import { Project } from '@prisma/client';
import { projectModel } from 'libs/shared-models/src/lib/_prisma';

export const mdProjectAdd = async (data: Omit<Project, 'id'>) => {
	return projectModel.create({
		data: data
	});
};

export const mdProjectGetAllByIds = async (
	ids: string[],
	conditions?: {
		orgId?: string;
	}
) => {
	const { orgId } = conditions || {};
	const where: {
		[key: string]: any;
	} = {};

	if (orgId) {
		where['organizationId'] = orgId;
	}

	return projectModel.findMany({
		where: {
			id: {
				in: ids
			},
			...where
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
};

export const mdProjectGetByOrgId = async (orgId: string) => {
	return projectModel.findMany({
		where: {
			organizationId: orgId
		}
	});
};
