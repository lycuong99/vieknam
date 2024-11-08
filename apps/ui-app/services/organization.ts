import { Organization } from '@prisma/client';
import { httpPost } from './_req';

export const createOrg = (data: Partial<Organization>) => {
	return httpPost('/auth/org', data);
};
