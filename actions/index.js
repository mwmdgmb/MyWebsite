import axios from 'axios';
import Cookies from 'js-cookie';
// import { getCookieFromRequest } from './../helpers/utils';

const setAuthHeader = () => {
	const token = Cookies.getJSON('jwt');

	if (token) {
		return { headers: { authorization: `Bearer ${token}` } };
	}

	return undefined;
};

export const getSecretData = async () => {
	return await axios.get('/api/v1/secret', setAuthHeader()).then((response) => response.data);
};

export const getSecretDataServer = async (req) => {
	return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then((response) => response.data);
};
