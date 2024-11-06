import { User } from '@prisma/client';
import { userModel } from './_prisma';

export const mdUserFindEmail = async (email: string) => {
	return userModel.findFirst({
		where: {
			email: email
		}
	});
};

export const mdUserFindFirst = async (cond: any) => {
	return userModel.findFirst(cond);
};

export const mdUserAdd = async (data: Omit<User, 'id'>) => {
	return userModel.create({
		data: data
	});
};
