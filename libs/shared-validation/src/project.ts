import { Project } from '@prisma/client';
import { safeParse } from 'libs/shared-validation/src/lib';
import { z } from 'zod';

const projectSchema = z
	.object({
		name: z.string().min(3).max(50),
		desc: z.string().max(200),
		cover: z.string().url(),
		organizationId: z.string(),
		createdBy: z.string(),
		createdAt: z.date(),
		updatedBy: z.string(),
		updatedAt: z.date()
	})
	.partial();

export const quickAddProjectSchema = projectSchema.required({
	name: true
});

export const validateQuickAddProject = (data: Partial<Project>) => {
	return safeParse(quickAddProjectSchema, data);
};
