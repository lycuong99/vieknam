import { getGoalieRefreshToken, getGoalieToken, saveGoalieRefreshToken, saveGoalieToken } from '@goalie/next';
import axios from 'axios';
import { toast } from 'sonner';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY + '/api'
});

instance.interceptors.request.use(
	config => {
		const refreshToken = getGoalieRefreshToken();
		const authorization = getGoalieToken();

		config.headers.setAuthorization(authorization);
		config.headers.set('RefreshToken', refreshToken);

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	response => {
		const headers = response.headers;
		const authorization = headers.authorization;
		const refreshToken = headers.refreshtoken;

		if (authorization && refreshToken) {
			saveGoalieRefreshToken(refreshToken);
			saveGoalieToken(authorization);
		}

		return response;
	},
	error => {
		const { response } = error;
		if (error.code === 'ERR_NETWORK') {
			toast.error(error.message);
		} else if (response?.status === 401) {
			toast.error('Your session has expired. Please login again.');
			window.location.href = '/sign-in';
		}
		return Promise.reject(error);
	}
);

export const req = instance;
export const httpGet = req.get;
export const httpPost = req.post;
export const httpPut = req.put;
export const httpDel = req.delete;
