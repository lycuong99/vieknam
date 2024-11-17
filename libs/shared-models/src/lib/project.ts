import { Project } from '@prisma/client';
import { projectModel } from 'libs/shared-models/src/lib/_prisma';

export const mdProjectAdd = async (data: Omit<Project, 'id'>) => {
	return projectModel.create({
		data: data
	});
};

export const mdProjectGetAllByIds = async (ids: string[]) => {
	return projectModel.findMany({
		where: {
			id: {
				in: ids
			}
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
