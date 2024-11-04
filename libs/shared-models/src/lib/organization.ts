import { Organization, OrganizationMembers } from '@prisma/client';
import { orgMemberModel, orgModel } from 'libs/shared-models/src/lib/_prisma';

export const mdOrgGetById = async (projectId: string) => {
	return orgModel.findFirst({
		where: {
			id: projectId
		}
	});
};

export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {
	return orgModel.create({
		data: data
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
