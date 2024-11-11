import { Organization, OrganizationMembers } from '@prisma/client';
import { orgMemberModel, orgModel } from './_prisma';

export const mdOrgGetById = async (projectId: string) => {
	return orgModel.findFirst({
		where: {
			id: projectId
		}
	});
};

export const mdOrgGet = async (projectIds: string | string[]) => {
	return orgModel.findMany({
		where: {
			id: {
				in: Array.isArray(projectIds) ? projectIds : [projectIds]
			}
		}
	});
};

export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {
	return orgModel.create({
		data: data
	});
};

export const mdOrgMemGetByUid = async (uid: string) => {
	return orgMemberModel.findMany({
		where: {
			uid
		}
	});
};

export const mdOrgMemberAdd = async (data: Omit<OrganizationMembers, 'id'>) => {
	return orgMemberModel.create({
		data: data
	});
};

export const mdOrgMemberAddMany = async (data: Omit<OrganizationMembers, 'id'>[]) => {
	return orgMemberModel.createMany({
		data: data
	});
};
