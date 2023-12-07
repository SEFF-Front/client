import axios from 'axios';

export const domainBack = 'http://localhost:4000/seff-academy/uploads';

const Api = axios.create({
  baseURL: 'http://localhost:4000/seff-academy/v1.0',
  headers: {'Content-Type': 'application/json',},
  withCredentials: true
});


export default Api;