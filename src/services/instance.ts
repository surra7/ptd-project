import { accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import _axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';

_axios.defaults.xsrfCookieName = 'csrftoken';
_axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const useSetAccessToken = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  return accessToken;
};
const useSetCSRFToken = () => {
  const [csrfToken] = useAtom(csrfTokenAtom);
  return csrfToken;
};

export const axios = _axios.create({
  baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
  timeout: 0,
  withXSRFToken: true,
  // withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const [accessToken] = useAtom(accessTokenAtom);
      const [csrfToken] = useAtom(csrfTokenAtom);
      if (accessToken && csrfToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers['x-csrftoken'] = `${csrfToken}`;
      }
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NjY1Njg2LCJpYXQiOjE3MTg2Mjk2ODYsImp0aSI6Ijk2OTg4ZmFiN2E4MzRjNDI4OTMyM2RkNGJhM2NkYzdjIiwidXNlcl9pZCI6MTR9.GbVLLzbM-RcSfCXkpRBFbhvfh_BSM0aaiHGBX2H92dU`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
};

axios.interceptors.response.use(
  response => response,
  error => {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error Response:', axiosError.response.data);
      console.error('Status:', axiosError.response.status);
      console.error('Headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      console.error('Error Request:', axiosError.request);
    } else {
      console.error('Error Message:', axiosError.message);
    }
  },
);
