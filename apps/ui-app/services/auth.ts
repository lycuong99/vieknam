import { User } from '@prisma/client';
import { httpPost } from './_req';

export function signIn(email: string, password: string) {
	return httpPost('/auth/sign-in', { email, password });
}      

export function signUp(data: Partial<User>) {
	return httpPost('/auth/sign-up', data);
}
