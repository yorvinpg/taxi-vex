import axios from 'axios';

export const httpClient = axios.create({
  baseURL:   `http://144.91.109.33/public/api/`, //process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});
