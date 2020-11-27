import axios from 'axios';

const api = axios.create({
  baseURL: 'https://leogutz.wmdd.ca',
});

export default api;
