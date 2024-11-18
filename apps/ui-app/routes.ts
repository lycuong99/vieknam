export const Routes = {
	HOME: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	ORGANIZATION: {
		BASE: '/organization',
		CREATE: '/organization/create',
		UPDATE: (id: string | number): string => `/organization/update/${id}`,
		VIEW: (id: string | number): string => `/${id}`
	},
	PROJECT: {
		VIEW: ({ orgId, projectId }: { orgId: string; projectId: string }): string => `/${orgId}/project/${projectId}`
	}
} as const;
