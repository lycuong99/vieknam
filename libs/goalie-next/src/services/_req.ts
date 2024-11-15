'use client';
import axios from 'axios';
import { toast } from 'sonner';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY + '/api'
});
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		const { response } = error;
		if (error.code === 'ERR_NETWORK') {
			toast.error(error.message);
		} else if (response?.status === 401) {
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
