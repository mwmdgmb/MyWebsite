import axios from 'axios';
import Cookies from 'js-cookie';
// import { getCookieFromRequest } from './../helpers/utils';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api/v1'
});

const setAuthHeader = () => {
	const token = Cookies.getJSON('jwt');

	if (token) {
		return { headers: { authorization: `Bearer ${token}` } };
	}

	return undefined;
};

const rejectPromise = (resError) => {
	let error = {};

	if (resError && resError.response && resError.response.data) {
		error = resError.response.data;
	} else {
		error = resError;
	}

	return Promise.reject(error);
};

export const getSecretData = async () => {
	return await axiosInstance.get('/secret', setAuthHeader()).then((response) => response.data);
};

export const getSecretDataServer = async (req) => {
	return await axiosInstance.get('/secret', setAuthHeader(req)).then((response) => response.data);
};

export const getPortfolios = async () => {
	return await axiosInstance.get('/portfolios').then((response) => response.data);
};

export const createPortfolio = async (portfolioData) => {
	return await axiosInstance
		.post('/portfolios', portfolioData, setAuthHeader())
		.then((response) => response.data)
		.catch((error) => rejectPromise(error));
};

export const updatePortfolio = async (portfolioData) => {
	return await axiosInstance
		.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
		.then((response) => response.data)
		.catch((error) => rejectPromise(error));
};

export const getPortfolioById = async (id) => {
	return await axiosInstance.get(`/portfolios/${id}`, setAuthHeader()).then((response) => response.data);
};

export const deletePortfolio = async (portfolioId) => {
	return await axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader()).then((response) => response.data);
};
