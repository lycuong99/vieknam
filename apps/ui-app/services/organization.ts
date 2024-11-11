import { Organization } from '@prisma/client';
import { httpGet, httpPost } from './_req';

export const createOrg = (data: Partial<Organization>) => {
	return httpPost('/org', data);
};

export const getOrg = () => httpGet('/org');
