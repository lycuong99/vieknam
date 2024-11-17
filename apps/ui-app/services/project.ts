import { Project } from '@prisma/client';
import { httpGet, httpPost } from './_req';
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutationConfig, QueryConfig } from './react-query';

type IProjectAdd = Pick<Project, 'name' | 'desc' | 'organizationId'>;

export const createProject = (data: IProjectAdd) => {
	return httpPost(`${data.organizationId}/project`, data);
};

export const getProjects = ({ orgId }: { orgId: string }) => {
	return httpGet(`${orgId}/project`);
};

export const getProjectQueryOptions = ({ orgId }: { orgId: string }) => {
	return queryOptions({
		queryKey: ['project', orgId],
		queryFn: () => getProjects({ orgId })
	});
};

type UseProjectsOptions = {
	orgId: string;
	queryConfig?: QueryConfig<typeof getProjectQueryOptions>;
};

export const useQueryProject = ({ orgId, queryConfig }: UseProjectsOptions) => {
	return useQuery({
		...getProjectQueryOptions({ orgId }),
		...queryConfig
	});
};

type UseCreateProjectOptions = {
	mutationConfig?: MutationConfig<typeof createProject>;
};

export const useCreateProject = ({ mutationConfig }: UseCreateProjectOptions = {}) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig ?? {};

	return useMutation({
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: getProjectQueryOptions({ orgId: variables.organizationId }).queryKey });
			onSuccess?.(data, variables, context);
		},
		...restConfig,
		mutationFn: createProject
	});
};
