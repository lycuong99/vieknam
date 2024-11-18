import { Organization } from '@prisma/client';
import { httpGet, httpPost } from './_req';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from './react-query';

export const createOrg = (data: Partial<Organization>) => {
	return httpPost('/org', data);
};

export const getOrg = () => httpGet('/org');

export const getOrgQueryOptions = () => {
	return queryOptions({
		queryKey: ['organization'],
		queryFn: () => getOrg()
	});
};

type UseOrganizationOptions = {
	queryConfig?: QueryConfig<typeof getOrgQueryOptions>;
};

export const useQueryOrganization = ({ queryConfig }: UseOrganizationOptions = {}) => {
	return useQuery({
		...getOrgQueryOptions(),
		...queryConfig
	});
};
