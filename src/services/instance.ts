import { accessTokenAtom } from '@/atoms/atoms';
import axios from 'axios';
import { useAtom } from 'jotai';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const calendarClient = axios.create({
  baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
  timeout: 0,
  headers: {
    Accept: 'application/json',
  },
});

calendarClient.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4Mjk5NTQwLCJpYXQiOjE3MTgyNjM1NDAsImp0aSI6Ijg5NTBmYmY5NTM1NzQxNTdiZDA4NjkwMjljNDk0OWZlIiwidXNlcl9pZCI6MTF9.QtmX9r-N0__MKNPbg04SoDV_MgwGLOH9k0ijH7MVPQo`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
