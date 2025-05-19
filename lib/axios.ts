import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postConnector = (path: string, data = {}, headers = {}) => {
  return instance.post(path, data, { headers });
};

export default instance;
