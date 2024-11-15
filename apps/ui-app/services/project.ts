import { Project } from '@prisma/client';
import { httpGet, httpPost } from './_req';

export const createProject = (data: Partial<Project>) => {
	return httpPost('/project', data);
};

export const getProject = () => httpGet('/project');


