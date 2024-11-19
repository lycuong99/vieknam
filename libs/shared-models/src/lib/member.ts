import { Members } from '@prisma/client';
import { memberModel } from './_prisma';

// ?? I think it will be mdMemberGetByUid
export const mdMemberGetProject = async (uid: string) => {
	return memberModel.findMany({
		where: {
			uid: uid //??
		}
	});
};

export const mdMemberAdd = async (data: Omit<Members, 'id'>) => {
	return memberModel.create({
		data: data
	});
};

export const mdMemberBelongProject = async (uid: string, projectId: string) => {
	return memberModel.findFirst({
		where: {
			uid: uid,
			projectId: projectId
		}
	});
};

/**
 * get all member in project by project id
 * @param projectId
 * @returns
 */
export const mdMemberGetAllByProjectId = async (projectId: string) => {
	return memberModel.findMany({
		where: {
			projectId: projectId
		},
		include: {
			users: true
		}
	});
};
