import { accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import _axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';

_axios.defaults.xsrfCookieName = 'csrftoken';
_axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const axios = _axios.create({
  baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
  timeout: 0,
  withXSRFToken: true,
  withCredentials: true,
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
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI1OTMwLCJpYXQiOjE3MTg3ODk5MzAsImp0aSI6IjE5OGU0ZWNiNWNhMTRmNGY4Njc0MGQ5MDA0MWFmYTYxIiwidXNlcl9pZCI6M30.BFP1Ea9G049ezlZPy_dQ2YkX9d0sB4EZGFDBtzXYH6c`;
      // config.headers['x-csrftoken'] = `IApSu38oJcK3U9Uhg2sUQcXCe2FsOT5D`;
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

// 로컬 테스트용 인증토큰 (혹시목라서..)
// import { accessTokenAtom } from '@/atoms/atoms';
// import _axios, { AxiosError } from 'axios';
// import { useAtom } from 'jotai';

// _axios.defaults.xsrfCookieName = 'csrftoken';
// _axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

// export const axios = _axios.create({
//   baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
//   timeout: 0,
//   withXSRFToken: true,
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//   },
// });

// axios.interceptors.request.use(
//   config => {
//     config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4Nzk1MzQ3LCJpYXQiOjE3MTg3NTkzNDcsImp0aSI6IjUyZWU2YmQ4NWEzYTQ4OTg5OGQxMDBjMjQ5MTkwODEyIiwidXNlcl9pZCI6Mn0.LMx1t7CDW_5mLWr9OJwFibXhMU4Ytq5zsrzKGoHx7v8`;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     const axiosError = error as AxiosError;
//     if (axiosError.response) {
//       console.error('Error Response:', axiosError.response.data);
//       console.error('Status:', axiosError.response.status);
//       console.error('Headers:', axiosError.response.headers);
//     } else if (axiosError.request) {
//       console.error('Error Request:', axiosError.request);
//     } else {
//       console.error('Error Message:', axiosError.message);
//     }
//   },
// );
