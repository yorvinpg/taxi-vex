import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});
