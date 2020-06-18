import axios from 'axios';

// const api = axios.create({ baseURL: 'http://localhost:3300'});
// const api = axios.create({ baseURL: 'http://matchapi.guillaumerx.fr:3300'});
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});

export default api;