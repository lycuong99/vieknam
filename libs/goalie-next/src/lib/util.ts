import { decode } from 'jsonwebtoken';
import { GoalieUser } from '../types';

const GOALIE_USER = 'GOALIE_USER';
const GOALIE_JWT_TOKEN = 'GOALIE_JWT_TOKEN';
const GOALIE_REFRESH_TOKEN = 'GOALIE_REFRESH_TOKEN';
const GOALIE_ORG = 'GOALIE_ORG';

export const saveGoalieUser = (user: GoalieUser) => {
	try {
		localStorage.setItem(GOALIE_USER, JSON.stringify(user));
	} catch (error) {
		return;
	}
};
export const getGoalieUser = () => {
	try {
		const user = localStorage.getItem(GOALIE_USER);
		
		return user ? JSON.parse(user) : null;
	} catch (error) {
		console.error('Error getting user from local storage:', error);
		return null;
	}
};

export const saveGoalieToken = (token: string) => {
	try {
		localStorage.setItem(GOALIE_JWT_TOKEN, token);
	} catch (error) {
		console.error('Error saving token to local storage:', error);
	}
};

export const getGoalieToken = () => {
	try {
		const token = localStorage.getItem(GOALIE_JWT_TOKEN);
		return token;
	} catch (error) {
		console.error('Error getting token from local storage:', error);
		return null;
	}
};

export const saveGoalieRefreshToken = (token: string) => {
	try {
		localStorage.setItem(GOALIE_REFRESH_TOKEN, token);
	} catch (error) {
		console.error('Error saving refresh token to local storage:', error);
	}
};

export const getGoalieRefreshToken = () => {
	try {
		const token = localStorage.getItem(GOALIE_REFRESH_TOKEN);
		return token;
	} catch (error) {
		console.error('Error getting refresh token from local storage:', error);
		return null;
	}
};

export const getDecodedGoalieRefreshToken = () => {
	try {
		const token = localStorage.getItem(GOALIE_REFRESH_TOKEN);
		const decoded = decode(token || '') as { exp: number };
		return decoded ?? { exp: 0 };
	} catch (error) {
		console.error('Error getting refresh token from local storage:', error);
		return { exp: 0 };
	}
};

export const clearAllGoalieTokens = () => {
	try {
		localStorage.removeItem(GOALIE_JWT_TOKEN);
		localStorage.removeItem(GOALIE_REFRESH_TOKEN);
	} catch (error) {
		console.error('Error clearing tokens from local storage:', error);
	}
};

export const isSessionExpired = () => {
	const decoded = getDecodedGoalieRefreshToken();
	return decoded.exp < Date.now() / 1000;
};

export const isSessionStillAlive = () => !isSessionExpired();
