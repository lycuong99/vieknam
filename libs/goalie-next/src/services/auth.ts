import { User } from '@prisma/client';
import { httpPost } from './_req';
import { saveGoalieRefreshToken, saveGoalieToken, saveGoalieUser } from '../lib/util';
import { GoalieUser } from '../types';
import { decode } from 'jsonwebtoken';

export async function signIn(email: string, password: string) {
	return httpPost('/auth/sign-in', { email, password }).then(res => {
		const { data, headers } = res;
		const user = data.data as GoalieUser;

		if (data.status !== 200) {
			return Promise.reject('INVALID_INFORMATION');
		}

		const accessToken = headers.authorization;
		const refreshToken = headers.refreshToken;

		saveGoalieToken(accessToken);
		saveGoalieRefreshToken(refreshToken);

		const decoded = decode(refreshToken) as { exp: number };

		saveGoalieUser({
			email: user.email,
			id: user.id,
			name: user.name,
			photo: user.photo,
			exp: decoded.exp
		});

		return Promise.resolve(user);
	});
}

export function signUp(data: Partial<User>) {
	return httpPost('/auth/sign-up', data);
}
