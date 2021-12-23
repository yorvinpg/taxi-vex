import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `http://34.136.36.44/public/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
