
import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromRequest } from "./../helpers/utils";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req ? getCookieFromRequest(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }

  return undefined;
};

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

export const getSecretData = async () => {
  return await axiosInstance
    .get("/secret", setAuthHeader())
    .then(response => response.data);
};

export const getSecretDataServer = async req => {
  return await axiosInstance
    .get("/secret", setAuthHeader(req))
    .then(response => response.data);
};

export const getPortfolios = async () => {
  return await axiosInstance.get("/portfolios").then(response => response.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post("/portfolios", portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updatePortfolio = async portfolioData => {
  return await axiosInstance
    .patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const getPortfolioById = async id => {
  return await axiosInstance
    .get(`/portfolios/${id}`, setAuthHeader())
    .then(response => response.data);
};

export const deletePortfolio = async portfolioId => {
  return await axiosInstance
    .delete(`/portfolios/${portfolioId}`, setAuthHeader())
    .then(response => response.data);
};

export const getBlogs = async req => {
  return await axiosInstance.get("/blogs").then(response => response.data);
};

export const getSlug = async slug => {
  return await axiosInstance
    .get(`/blogs/s/${slug}`)
    .then(response => response.data);
};

export const getUserBlogs = async req => {
  return await axiosInstance
    .get("/blogs/mydata", setAuthHeader(req))
    .then(response => response.data);
};

export const createBlog = (blogData, lockId) => {
  return axiosInstance
    .post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
    .then(response => response.data)
    .catch(e => rejectPromise(e));
};

export const updateBlog = (blogData, blogId) => {
  return axiosInstance
    .patch(`/blogs/${blogId}`, blogData, setAuthHeader())
    .then(response => response.data);
};

export const getBlogById = blogId => {
  return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data);
};

export const deleteBlogs = blogId => {
  return axiosInstance
    .delete(`/blogs/${blogId}`, setAuthHeader())
    .then(response => response.data)
    .catch(e => rejectPromise(e));
};
