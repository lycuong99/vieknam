import { User } from '@prisma/client';
import { safeParse } from './lib';
import { z } from 'zod';

const user = z
	.object({
		email: z.string().email(),
		password: z.string().min(4).max(100),
		name: z.string().min(2).max(30),
		country: z.string(),
		bio: z.string(),
		dob: z.date(),

		createdBy: z.string(),
		createdAt: z.date(),
		updatedBy: z.string(),
		updatedAt: z.date()
	})
	.partial();
const registerUserSchema = user.required({
	email: true,
	name: true,
	password: true
});
export const signUpUserSchema = registerUserSchema
	.extend({
		confirmPassword: z.string()
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword']
	});

export const loginUserSchema = user.required({
	email: true,
	password: true
});

export const validateRegisterUser = (data: Partial<User>) => {
	return safeParse(registerUserSchema, data);
};

export const validateLoginUser = (data: Partial<User>) => {
	return safeParse(loginUserSchema, data);
};
