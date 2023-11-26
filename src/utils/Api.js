import axios from 'axios';
const Api = axios.create({
  baseURL: 'http://localhost:4000/seff-academy/v1.0',
  headers: {'Content-Type': 'application/json',},
  withCredentials: true
});


export default Api;