import axios from 'axios';

const  api = axios.create({
  baseURL: 'https://fatoracao-backend.herokuapp.com/'
})

export default api;
