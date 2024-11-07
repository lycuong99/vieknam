import axios from 'axios';
import { toast } from 'sonner';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY + '/api'
});

const LOCAL_STORAGE_KEY = {
	REFRESH_TOKEN: 'refreshToken',
	AUTHORIZATION: 'authorization'
};

instance.interceptors.request.use(
	config => {
		const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
		const authorization = localStorage.getItem(LOCAL_STORAGE_KEY.AUTHORIZATION);

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
			localStorage.setItem(LOCAL_STORAGE_KEY.AUTHORIZATION, authorization);
			localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
		}

		return response;
	},
	error => {
		const { response } = error;
		if (response?.status === 401) {
			toast.error('Your session has expired. Please login again.');
		}
		return Promise.reject(error);
	}
);

export const req = instance;
export const httpGet = req.get;
export const httpPost = req.post;
export const httpPut = req.put;
export const httpDel = req.delete;
