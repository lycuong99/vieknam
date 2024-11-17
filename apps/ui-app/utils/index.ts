import { AxiosResponse } from 'axios';

export function getDataFromResponse(res: AxiosResponse) {
	return res.data.data;
}
