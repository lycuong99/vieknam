import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export const queryConfig = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false,
		staleTime: 60 * 1000
	}
} satisfies DefaultOptions;

export type ApiReturnType<FnTyp extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<FnTyp>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<ReturnType<T>, 'queryKey' | 'queryFn'>;

export type MutationConfig<MutationFnType extends (...args: any[]) => Promise<any>> = UseMutationOptions<
	ApiReturnType<MutationFnType>,
	Error,
	Parameters<MutationFnType>[0]
>;
