import { Schema } from 'zod';

export interface ParseResult {
	data: object | null;
	error: object | null;
	errorArr: Record<string, string>;
}

export function safeParse(schema: Schema, inputData: object): ParseResult {
	let data = null,
		error = null;
	const errorArr: Record<string, string> = {};

	try {
		const result = schema.parse(inputData);
		data = result;
	} catch (e: any) {
		error = e;

		const issues = (error as any).issues;
		issues.forEach((issue: { path: string[]; message: string }) => {
			errorArr[issue.path[0]] = issue.message;
		});
	}

	return { data, error, errorArr };
}
